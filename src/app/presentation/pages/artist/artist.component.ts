import { Component, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { ListOfAlbumsComponent } from '../../components/organisms/list-of-albums/list-of-albums.component';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { PercentageBarComponent } from '../../components/atoms/percentage-bar/percentage-bar.component';

import { ArtistUseCase } from '../../../application/artist/artist.use-case';
import { AlbumsUseCase } from '../../../application/albums/albums.use-case';
import { TracksUseCase } from '../../../application/tracks/tracks.use-case';

import { OneArtistModel } from '../../../domain/artist/artist.entity';
import { AlbumsModel, AlbumInfo } from '../../../domain/albums/albums.entity';
import { TrackUIModel } from '../../../domain/tracks/tracks.entity';

import { extractAlbumInfo } from '../../helpers/get-filtered-albums-data';
import { useResource } from '../../../shared/state/use-resource';
import { mapDomainErrorToMessage } from '../../helpers/map-error';
import { ResourceStateComponent } from '../../components/organisms/resource-state/resource-state.component';
import { SectionHeaderComponent } from '../../components/atoms/section-header/section-header.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    CommonModule,
    SpotifyHeroComponent,
    ListOfAlbumsComponent,
    ListOfSongsComponent,
    PercentageBarComponent,
    ResourceStateComponent,
    SectionHeaderComponent
  ],
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private artistUseCase = inject(ArtistUseCase);
  private albumsUseCase = inject(AlbumsUseCase);
  private tracksUseCase = inject(TracksUseCase);

  dominantColor = 'rgb(30,30,30)';

  // 🔥 RESOURCES
  artistResource = useResource<OneArtistModel | null>(null);
  albumsResource = useResource<AlbumInfo[]>([]);
  tracksResource = useResource<TrackUIModel[]>([]);

  // 🧠 DERIVED STATE
  artist = computed(() => this.artistResource.state().data);

  albums = computed(() => this.albumsResource.state().data);

  likedTracks = computed(() => this.tracksResource.state().data);

  visibleTracks = computed(() => {
    return this.showAllTracks
      ? this.likedTracks()
      : this.likedTracks().slice(0, 3);
  });

  artistName = computed(() => this.albums()[0]?.artistName || 'Unknown Artist');

  showAllTracks = false;

  // 🚀 LOADERS

  async loadArtist(id: string) {
    await this.artistResource.load(
      async () => {
        const result = await lastValueFrom(this.artistUseCase.getArtist(id));
        return result as OneArtistModel;
      },
      {
        isEmpty: data => !data,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  async loadAlbums(id: string) {
    await this.albumsResource.load(
      async () => {
        const result = await lastValueFrom(this.albumsUseCase.getAlbums(id));

        return extractAlbumInfo(result as AlbumsModel);
      },
      {
        isEmpty: data => !data || data.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  async loadTracks(artistId: string) {
    await this.tracksResource.load(
      async () => {
        const tracks = await lastValueFrom(this.tracksUseCase.getMyTracks());

        return tracks
          .filter(track => track.track.artists.some(a => a.id === artistId))
          .map(track => ({
            id: track.track.id,
            title: track.track.name,
            duration: track.track.duration_ms,
            albumName: track.track.album.name,
            albumImage:
              track.track.album.images[2]?.url ||
              track.track.album.images[0]?.url ||
              '',
            artists: track.track.artists.map(a => a.name).join(', '),
            link: track.track.external_urls.spotify
          }));
      },
      {
        isEmpty: data => !data || data.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  // 🎯 ACTIONS

  toggleTracks() {
    this.showAllTracks = !this.showAllTracks;
  }

  openArtist() {
    const url = this.artist()?.external_urls?.spotify;
    if (url) window.open(url, '_blank');
  }

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // 🔁 INIT

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['artistId'];

      this.loadArtist(id);
      this.loadAlbums(id);
      this.loadTracks(id);
    });
  }
}
