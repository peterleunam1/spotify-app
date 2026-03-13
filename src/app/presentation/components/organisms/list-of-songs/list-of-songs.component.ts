import { Component, inject, Input, OnInit } from '@angular/core';
import { TracksUseCase } from '../../../../application/tracks/tracks.use-case';
import { lastValueFrom } from 'rxjs';
import {
  LikedTrackItem,
  SingleSongModel,
  Track,
  TracksModel,
  TrackUIModel
} from '../../../../domain/tracks/tracks.entity';
import { CommonModule } from '@angular/common';
import { MainButtonComponent } from '../../atoms/main-button/main-button.component';
import { LoaderComponent } from '../../atoms/loader/loader.component';

@Component({
  selector: 'app-list-of-songs',
  imports: [CommonModule, MainButtonComponent, LoaderComponent],
  templateUrl: './list-of-songs.component.html'
})
export class ListOfSongsComponent {

  @Input() tracks: TrackUIModel[] = [];
  @Input() isLoading = false;
  @Input() albumName = 'Songs';
@Input() showLike = false;
  showAllTracks = false;
  minTracks = 3;

  get visibleTracks() {
    if (this.showAllTracks) return this.tracks;
    return this.tracks.slice(0, this.minTracks);
  }

  toggleTracks() {
    this.showAllTracks = !this.showAllTracks;
  }

  formatDuration(ms: number): string {

    const minutes = Math.floor(ms / 60000);

    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }


//   private tracksUseCase = inject(TracksUseCase);
//   private mapper = new ListOfSongMapper();

//   tracksResponse: TracksModel = {} as TracksModel;
//   tracks: SingleSongModel[] = [];
//   isLoading = false;
//   albumName = 'Songs';

//   @Input() albumId = '';

//   // 🔹 Paginación
//   currentPage = 1;
//   pageSize = 5;
//   totalPages = 0;

//   async getTracks(albumId: string) {
//     this.isLoading = true;
//     try {
//       const result = await lastValueFrom(this.tracksUseCase.getTracks(albumId));
//       this.tracksResponse = result;
//       this.tracks = this.mapper.mapTo(result);
//       this.totalPages = Math.ceil(this.tracks.length / this.pageSize);
//     } catch {
//       throw new Error('An error ocurred, try again later');
//     } finally {
//       this.isLoading = false;
//     }
//   }

//   ngOnInit() {
//     this.getTracks(this.albumId);
//   }

//   // ✅ Función para formatear duración en mm:ss
// formatDuration(ms: number): string {
//   const minutes = Math.floor(ms / 60000);
//   const seconds = Math.floor((ms % 60000) / 1000)
//     .toString()
//     .padStart(2, '0');

//   return `${minutes}:${seconds}`;
// }

//   // 🔹 Función para obtener las canciones de la página actual
//   minTracks = 5;
// showAll = false;

// get visibleTracks() {
//   if (this.showAll) return this.tracks;
//   return this.tracks.slice(0, this.minTracks);
// }

// toggleTracks() {
//   this.showAll = !this.showAll;
// }

// openTrack(url: string) {
//   window.open(url, '_blank');
// }

}
