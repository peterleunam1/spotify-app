import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentlyPlayedTrackModel } from '../../../../domain/player/player.entity';
import { SingerComponent } from '../../molecules/singer/singer.component';
import { CardComponent } from '../../atoms/card/card.component';
import { SectionHeaderComponent } from '../../atoms/section-header/section-header.component';
import { StatsComponent } from '../../molecules/stats/stats.component';

@Component({
  selector: 'app-repeat-and-stats',
  standalone: true,
  imports: [
    CommonModule,
    SingerComponent,
    CardComponent,
    SectionHeaderComponent,
    StatsComponent
  ],
  templateUrl: './repeat-and-stats.component.html'
})
export class RepeatAndStatsComponent {
  @Input()
  tracks: RecentlyPlayedTrackModel[] = [];

  private getHoursAgo(date: Date): number {
    return (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60);
  }

  private getRecencyWeight(hoursAgo: number): number {
    return 1 / (hoursAgo + 2);
  }

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

  get todayLabel(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long'
    });
  }
}
