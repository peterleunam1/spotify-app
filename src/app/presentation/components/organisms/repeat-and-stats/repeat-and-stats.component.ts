import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentlyPlayedTrackModel } from '../../../../domain/player/player.entity';
import { SingerComponent } from '../../molecules/singer/singer.component';
import { CardComponent } from '../../atoms/card/card.component';
import { SectionHeaderComponent } from '../../atoms/section-header/section-header.component';

interface QuickStats {
  totalTracks: number;
  totalHours: string;
  totalArtists: number;
  peakDay: string;
  avgSessionMinutes: number;
  topArtist: string;
}

@Component({
  selector: 'app-repeat-and-stats',
  standalone: true,
  imports: [
    CommonModule,
    SingerComponent,
    CardComponent,
    SectionHeaderComponent
  ],
  templateUrl: './repeat-and-stats.component.html'
})
export class RepeatAndStatsComponent {
  @Input()
  tracks: RecentlyPlayedTrackModel[] = [];

  // 🔥 UTILS
  private getHoursAgo(date: Date): number {
    return (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60);
  }

  private getRecencyWeight(hoursAgo: number): number {
    return 1 / (hoursAgo + 2); // suavizado
  }

  // 🔁 ON REPEAT (🔥 PRO)
  get onRepeatTracks(): RecentlyPlayedTrackModel[] {
    const map = new Map<
      string,
      {
        track: RecentlyPlayedTrackModel;
        score: number;
      }
    >();

    this.tracks.forEach(track => {
      const hoursAgo = this.getHoursAgo(track.playedAt);
      const weight = this.getRecencyWeight(hoursAgo);

      if (!map.has(track.id)) {
        map.set(track.id, {
          track,
          score: 0
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map.get(track.id)!.score += weight;
    });

    return Array.from(map.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.track);
  }
  private getTodayTracks(): RecentlyPlayedTrackModel[] {
    const now = new Date();

    return this.tracks.filter(track => {
      const date = new Date(track.playedAt);

      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    });
  }

  get todayLabel(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long'
    });
  }
  // 📊 STATS (🔥 MÁS PRECISOS)
  get stats(): QuickStats {
    const todayTracks = this.getTodayTracks();

    if (!todayTracks.length) {
      return {
        totalTracks: 0,
        totalHours: '0',
        totalArtists: 0,
        peakDay: 'Today',
        avgSessionMinutes: 0,
        topArtist: '-'
      };
    }

    // 🎧 TOTAL TRACKS
    const totalTracks = todayTracks.length;

    // 🎤 UNIQUE ARTISTS
    const totalArtists = new Set(todayTracks.map(t => t.artistId)).size;

    // ⏱ TOTAL HOURS
    const totalMs = todayTracks.reduce((acc, t) => acc + t.durationMs, 0);

    const totalHours = (totalMs / (1000 * 60 * 60)).toFixed(1);

    // 🔥 TOP ARTIST (con recency weighting)
    const artistMap: Record<string, number> = {};

    todayTracks.forEach(t => {
      const hoursAgo = this.getHoursAgo(t.playedAt);
      const weight = this.getRecencyWeight(hoursAgo);

      artistMap[t.artist] = (artistMap[t.artist] || 0) + weight;
    });

    const topArtist =
      Object.entries(artistMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    // 🧠 SESSION ANALYSIS
    const sortedTracks = [...todayTracks].sort(
      (a, b) => new Date(a.playedAt).getTime() - new Date(b.playedAt).getTime()
    );

    const sessions: number[] = [];
    let currentSession = 1;

    for (let i = 1; i < sortedTracks.length; i++) {
      const prev = new Date(sortedTracks[i - 1].playedAt).getTime();
      const curr = new Date(sortedTracks[i].playedAt).getTime();

      const diffMinutes = (curr - prev) / (1000 * 60);

      if (diffMinutes < 30) {
        currentSession++;
      } else {
        sessions.push(currentSession);
        currentSession = 1;
      }
    }

    sessions.push(currentSession);

    const avgSessionMinutes = Math.round(
      (sessions.reduce((a, b) => a + b, 0) / sessions.length) * 3
    );

    return {
      totalTracks,
      totalHours,
      totalArtists,
      peakDay: 'Today',
      avgSessionMinutes,
      topArtist
    };
  }
}
