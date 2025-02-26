import { Component, inject, Input, OnInit } from '@angular/core';
import { TracksUseCase } from '../../../../application/tracks/tracks.use-case';
import { lastValueFrom } from 'rxjs';
import { SingleSongModel, TracksModel } from '../../../../domain/tracks/tracks.entity';
import { ListOfSongMapper } from './mappers/list-of-song.mapper';
import { CommonModule } from '@angular/common';
import { MainButtonComponent } from '../../atoms/main-button/main-button.component';
import { LoaderComponent } from '../../atoms/loader/loader.component';

@Component({
  selector: 'app-list-of-songs',
  imports: [CommonModule, MainButtonComponent, LoaderComponent],
  templateUrl: './list-of-songs.component.html',
  styleUrl: './list-of-songs.component.css'
})
export class ListOfSongsComponent implements OnInit {
  private tracksUseCase = inject(TracksUseCase);
  private mapper = new ListOfSongMapper();

  tracksResponse: TracksModel = {} as TracksModel;
  tracks: SingleSongModel[] = [];
  isLoading = false;
  albumName = 'Songs';

  @Input() albumId = '';

  // 🔹 Paginación
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;

  async getTracks(albumId: string) {
    this.isLoading = true;
    try {
      const result = await lastValueFrom(this.tracksUseCase.getTracks(albumId));
      this.tracksResponse = result;
      this.tracks = this.mapper.mapTo(result); // Se aplica el mapper
      this.totalPages = Math.ceil(this.tracks.length / this.pageSize); // ✅ Calcula total de páginas
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  ngOnInit() {
    this.getTracks(this.albumId);
  }

  // ✅ Función para formatear duración en mm:ss
  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // 🔹 Función para obtener las canciones de la página actual
  get paginatedTracks(): SingleSongModel[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.tracks.slice(startIndex, startIndex + this.pageSize);
  }

  // 🔹 Cambiar de página
  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }
}
