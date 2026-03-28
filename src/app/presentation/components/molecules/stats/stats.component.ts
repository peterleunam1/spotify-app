import { Component, Input } from '@angular/core';
import { RecentlyPlayedTrackModel } from '../../../../domain/player/player.entity';

interface QuickStats {
  totalTracks: number;
  totalHours: string;
  totalArtists: number;
  peakDay: string;
  avgSessionMinutes: number;
  topArtist: string;
}
@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  @Input() tracks: RecentlyPlayedTrackModel[] = [];

  private getHoursAgo(date: Date): number {
    return (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60);
  }

  private getRecencyWeight(hoursAgo: number): number {
    return 1 / (hoursAgo + 2);
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

    const totalTracks = todayTracks.length;

    const totalArtists = new Set(todayTracks.map(t => t.artistId)).size;

    const totalMs = todayTracks.reduce((acc, t) => acc + t.durationMs, 0);
    const totalHours = (totalMs / (1000 * 60 * 60)).toFixed(1);

    const artistMap: Record<string, number> = {};

    todayTracks.forEach(t => {
      const hoursAgo = this.getHoursAgo(t.playedAt);
      const weight = this.getRecencyWeight(hoursAgo);

      artistMap[t.artist] = (artistMap[t.artist] || 0) + weight;
    });

    const topArtist =
      Object.entries(artistMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

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
