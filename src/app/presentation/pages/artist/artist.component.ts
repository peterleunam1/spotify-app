import { Component, inject, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { ArtistUseCase } from '../../../application/artist/artist.use-case';
import { OneArtistModel } from '../../../domain/artist/artist.entity';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { AlbumInfo, AlbumsModel } from '../../../domain/albums/albums.entity';
import { AlbumsUseCase } from '../../../application/albums/albums.use-case';
import { extractAlbumInfo } from '../../helpers/get-filtered-albums-data';
import { ListOfAlbumsComponent } from '../../components/organisms/list-of-albums/list-of-albums.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { TracksUseCase } from '../../../application/tracks/tracks.use-case';
import {
  MeTrarcksModel,
  TrackUIModel
} from '../../../domain/tracks/tracks.entity';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { PercentageBarComponent } from '../../components/atoms/percentage-bar/percentage-bar/percentage-bar.component';

@Component({
  selector: 'app-artist',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    CommonModule,
    SpotifyHeroComponent,
    ListOfAlbumsComponent,
    LoaderComponent,
    ListOfSongsComponent,
    PercentageBarComponent
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private artistUseCase = inject(ArtistUseCase);
  private albumsUseCase = inject(AlbumsUseCase);
  private tracksUseCase = inject(TracksUseCase);

  artistInfo: OneArtistModel = {} as OneArtistModel;
  myTracksResponse = {} as MeTrarcksModel;
  isLoading = false;
  dominantColor = 'rgb(30,30,30)';
  
  async getArtist(singerId: string) {
    try {
      this.isLoading = true;
      const result = await lastValueFrom(
        this.artistUseCase.getArtist(singerId)
      );
      this.artistInfo = result;
    } catch {
      throw new Error('An unexpected error has been ocurred.');
    } finally {
      this.isLoading = false;
    }
  }

  albumsResponse: AlbumsModel = {} as AlbumsModel;
  albums: AlbumInfo[] = [];
  isLoadingAlbum = false;
  artistName = 'Unknown Artist';

  async getAlbums(singerId: string) {
    try {
      this.isLoadingAlbum = true;
      const result = await lastValueFrom(
        this.albumsUseCase.getAlbums(singerId)
      );
      this.albumsResponse = result;
      this.albums = extractAlbumInfo(this.albumsResponse);
      this.artistName = this.albums[0]?.artistName || 'Unknown Artist';
    } catch {
      throw new Error('An unexpected error has been ocurred.');
    } finally {
      this.isLoadingAlbum = false;
    }
  }

  isLoadingTracks = false;

  likedTracksFromArtist: TrackUIModel[] = [];

  visibleTracks: TrackUIModel[] = [];

  showAllTracks = false; // topLikedTracksFromArtist: LikedTrackItem[] = [];
  async getMyTracks(artistId: string) {
    try {
      this.isLoadingTracks = true;

      const tracks = await lastValueFrom(this.tracksUseCase.getMyTracks());

      this.likedTracksFromArtist = tracks
        .filter(track =>
          track.track.artists.some(artist => artist.id === artistId)
        )
        .map(track => ({
          id: track.track.id,
          title: track.track.name,
          duration: track.track.duration_ms,
          albumName: track.track.album.name,
          albumImage:
            track.track.album.images[2].url ||
            track.track.album.images[0].url ||
            '',
          artists: track.track.artists.map(a => a.name).join(', '),
          link: track.track.external_urls.spotify
        }));

      this.visibleTracks = this.likedTracksFromArtist.slice(0, 3);
    } catch {
      throw new Error('An unexpected error has been ocurred.');
    } finally {
      this.isLoadingTracks = false;
    }
  }
  toggleTracks() {
    this.showAllTracks = !this.showAllTracks;

    this.visibleTracks = this.showAllTracks
      ? this.likedTracksFromArtist
      : this.likedTracksFromArtist.slice(0, 3);
  }
  openArtist() {
    const url = this.artistInfo?.external_urls?.spotify;
    if (url) {
      window.open(url, '_blank');
    }
  }
  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getArtist(params['artistId']);
      this.getAlbums(params['artistId']);
      this.getMyTracks(params['artistId']);
    });
  }
}
