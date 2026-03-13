import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { AlbumsUseCase } from '../../../application/albums/albums.use-case';
import { lastValueFrom } from 'rxjs';
import {
  AlbumModel
} from '../../../domain/albums/albums.entity';
import { ListOfAlbumsComponent } from '../../components/organisms/list-of-albums/list-of-albums.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { CommonModule } from '@angular/common';
import { SpotifyHeroComponent } from '../../organisms/spotify-hero/spotify-hero.component';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { TrackUIModel } from '../../../domain/tracks/tracks.entity';
import { AlbumTrackMapper } from '../../components/organisms/list-of-songs/mappers/list-of-song.mapper';
import { PercentageBarComponent } from '../../components/atoms/percentage-bar/percentage-bar/percentage-bar.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  imports: [
    MainLayoutComponent,
    ListOfAlbumsComponent,
    NavbarComponent,
    LoaderComponent,
    CommonModule,
    SpotifyHeroComponent,
    ListOfSongsComponent,
    PercentageBarComponent
  ]
})
export class AlbumsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private albumsUseCase = inject(AlbumsUseCase);
  albumResponse = {} as AlbumModel;
  isLoading = false;
  artistName = 'Unknown Artist';
  dominantColor = 'rgb(30,30,30)';
  tracks: TrackUIModel[] = [];
  private trackMapper = new AlbumTrackMapper();

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
    console.error('Error loading album:', error);
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

    if (!tracks || !tracks.length) return '';

    const totalMs = tracks.reduce((sum, track) => sum + track.duration_ms, 0);

    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);

    return `${minutes} min ${seconds} sec`;
  }
  // name = this.albumResponse.name || 'Unknown Artist';
  // nameArtist = this.albumResponse.artists[0].name || 'Unknown Artist';
  // img = this.albumResponse.images[0]?.url || '';
  async ngOnInit() {
    this.route.params.subscribe(async params => {
      await this.getOneAlbum(params['albumId']);
    });
  }
}
