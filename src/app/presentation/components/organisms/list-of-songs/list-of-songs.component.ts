import { Component, inject, Input } from '@angular/core';
import { TrackUIModel } from '../../../../domain/tracks/tracks.entity';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../atoms/section-header/section-header.component';
import { SkeletonComponent } from '../../atoms/skeleton/skeleton.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-songs',
  imports: [CommonModule, SectionHeaderComponent, SkeletonComponent],
  templateUrl: './list-of-songs.component.html'
})
export class ListOfSongsComponent {
  private router = inject(Router);
  @Input() tracks: TrackUIModel[] = [];
  @Input() isLoading = false;
  @Input() albumName = 'Songs';
  @Input() showLike = false;
  @Input() minTracks = 3;
  @Input() titleSmall = false;
  showAllTracks = false;

  get visibleTracks() {
    if (this.showAllTracks) return this.tracks;
    return this.tracks.slice(0, this.minTracks);
  }

  toggleTracks() {
    this.showAllTracks = !this.showAllTracks;
  }
  handleRedirect(trackId: string) {
    this.router.navigate([`/track/${trackId}`]);
  }
  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);

    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
