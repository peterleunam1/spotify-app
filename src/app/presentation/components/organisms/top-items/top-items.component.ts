import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingerComponent } from '../../molecules/singer/singer.component';
import { TopArtistsModel } from '../../../../domain/artist/artist.entity';
import { TopTracksModel } from '../../../../domain/tracks/tracks.entity';
import { SectionHeaderComponent } from '../../atoms/section-header/section-header.component';
import { SkeletonComponent } from '../../atoms/skeleton/skeleton.component';
import {
  TimeRange,
  TimeRangerSelectorComponent
} from '../../molecules/timer-ranger-selector/time-ranger-selector.component';

@Component({
  selector: 'app-top-items',
  standalone: true,
  imports: [
    CommonModule,
    SingerComponent,
    TimeRangerSelectorComponent,
    SectionHeaderComponent,
    SkeletonComponent
  ],
  templateUrl: './top-items.component.html'
})
export class TopItemsComponent {
  @Input()
  mode: 'compact' | 'interactive' = 'compact';

  @Input({ required: true })
  type!: 'artists' | 'tracks';

  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  description!: string;

  @Input()
  artists: TopArtistsModel | null = null;

  @Input()
  tracks: TopTracksModel | null = null;

  @Input()
  isLoading = false;

  @Output()
  rangeChange = new EventEmitter<TimeRange>();

  @Output()
  seeAll = new EventEmitter<void>();

  onTimeRangeChange(range: TimeRange) {
    this.rangeChange.emit(range);
  }

  onSeeAll() {
    this.seeAll.emit();
  }

  getLimit(): number {
    return this.mode === 'compact' ? 5 : 30;
  }
}
