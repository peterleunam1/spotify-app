import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { AlbumsUseCase } from '../../../application/albums/albums.use-case';
import { lastValueFrom } from 'rxjs';
import { AlbumModel } from '../../../domain/albums/albums.entity';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { TrackUIModel } from '../../../domain/tracks/tracks.entity';
import { PercentageBarComponent } from '../../components/atoms/percentage-bar/percentage-bar.component';
import { formatDuration } from '../../helpers/get-format-duration';
import { AlbumTrackMapper } from '../../../application/singers/list-of-song.mapper';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    CommonModule,
    SpotifyHeroComponent,
    ListOfSongsComponent,
    PercentageBarComponent
  ]
})
export class AlbumsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private albumsUseCase = inject(AlbumsUseCase);
  private trackMapper = new AlbumTrackMapper();

  isLoading = false;
  tracks: TrackUIModel[] = [];
  artistName = 'Unknown Artist';
  dominantColor = 'rgb(30,30,30)';
  albumResponse = {} as AlbumModel;

  async getOneAlbum(albumId: string) {
    try {
      this.isLoading = true;

      this.albumResponse = await lastValueFrom(
        this.albumsUseCase.getOneAlbum(albumId)
      );

      const mappedTracks = this.trackMapper.mapTo(
        this.albumResponse.tracks.items
      );

      const albumImage =
        this.albumResponse.images?.[2]?.url ||
        this.albumResponse.images?.[0]?.url ||
        '';

      const albumName = this.albumResponse.name;

      this.tracks = mappedTracks.map(track => ({
        ...track,
        albumImage,
        albumName
      }));
    } catch (error) {
      throw new Error('An unexpected error has been ocurred.');
    } finally {
      this.isLoading = false;
    }
  }

  get albumDescription(): string {
    const artist = this.albumResponse?.artists?.[0]?.name || '';
    const year = this.albumResponse?.release_date?.split('-')[0] || '';
    const tracks = this.albumResponse?.total_tracks || 0;

    return `${artist} • ${year} • ${tracks} songs • ${this.totalDuration}`;
  }

  openAlbum() {
    const url = this.albumResponse?.external_urls?.spotify;
    if (url) {
      window.open(url, '_blank');
    }
  }

  get totalDuration(): string {
    const tracks = this.albumResponse?.tracks?.items;
    if (!tracks?.length) return '';
    const totalMs = tracks.reduce((sum, t) => sum + (t.duration_ms ?? 0), 0);
    return formatDuration(totalMs);
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      await this.getOneAlbum(params['albumId']);
    });
  }
}
