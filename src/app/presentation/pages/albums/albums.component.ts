import { Component, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { PercentageBarComponent } from '../../components/atoms/percentage-bar/percentage-bar.component';

import { AlbumsUseCase } from '../../../application/albums/albums.use-case';
import { AlbumModel } from '../../../domain/albums/albums.entity';
import { TrackUIModel } from '../../../domain/tracks/tracks.entity';

import { AlbumTrackMapper } from '../../../application/singers/list-of-song.mapper';
import { formatDuration } from '../../helpers/get-format-duration';

import { useResource } from '../../../shared/state/use-resource';
import { mapDomainErrorToMessage } from '../../helpers/map-error';
import { SectionHeaderComponent } from '../../components/atoms/section-header/section-header.component';
import { ResourceStateComponent } from '../../components/organisms/resource-state/resource-state.component';

@Component({
  selector: 'app-albums',
  standalone: true,
  templateUrl: './albums.component.html',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    CommonModule,
    SpotifyHeroComponent,
    ListOfSongsComponent,
    PercentageBarComponent,
    SectionHeaderComponent,
    ResourceStateComponent
  ]
})
export class AlbumsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private albumsUseCase = inject(AlbumsUseCase);
  private trackMapper = new AlbumTrackMapper();

  dominantColor = 'rgb(30,30,30)';

  // 🔥 RESOURCE
  albumResource = useResource<{
    album: AlbumModel;
    tracks: TrackUIModel[];
  } | null>(null);

  // 🧠 DERIVED STATE

  album = computed(() => this.albumResource.state().data?.album);

  tracks = computed(() => this.albumResource.state().data?.tracks ?? []);

  albumDescription = computed(() => {
    const album = this.album();
    if (!album) return '';

    const artist = album.artists?.[0]?.name || '';
    const year = album.release_date?.split('-')[0] || '';
    const tracks = album.total_tracks || 0;

    return `${artist} • ${year} • ${tracks} songs • ${this.totalDuration()}`;
  });

  totalDuration = computed(() => {
    const album = this.album();
    if (!album?.tracks?.items?.length) return '';

    const totalMs = album.tracks.items.reduce(
      (sum, t) => sum + (t.duration_ms ?? 0),
      0
    );

    return formatDuration(totalMs);
  });

  // 🚀 LOAD

  async loadAlbum(albumId: string) {
    await this.albumResource.load(
      async () => {
        const album = await lastValueFrom(
          this.albumsUseCase.getOneAlbum(albumId)
        );

        const mappedTracks = this.trackMapper.mapTo(album.tracks.items);

        const albumImage =
          album.images?.[2]?.url || album.images?.[0]?.url || '';

        const tracks = mappedTracks.map(track => ({
          ...track,
          albumImage,
          albumName: album.name
        }));

        return { album, tracks };
      },
      {
        isEmpty: data => !data,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  openAlbum() {
    const url = this.album()?.external_urls?.spotify;
    if (url) window.open(url, '_blank');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadAlbum(params['albumId']);
    });
  }
}
