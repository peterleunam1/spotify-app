import { Component, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';

import { PlaylistsUseCase } from '../../../application/playlists/playlists.use-case';
import { OnePlaylistModel } from '../../../domain/playlists/playlists.entity';
import { TrackUIModel } from '../../../domain/tracks/tracks.entity';

import { formatDuration } from '../../helpers/get-format-duration';
import { useResource } from '../../../shared/state/use-resource';
import { mapDomainErrorToMessage } from '../../helpers/map-error';
import { ResourceStateComponent } from '../../components/organisms/resource-state/resource-state.component';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../components/atoms/section-header/section-header.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  templateUrl: './playlist.component.html',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    SpotifyHeroComponent,
    ListOfSongsComponent,
    ResourceStateComponent,
    CommonModule,
    SectionHeaderComponent,
    SectionHeaderComponent
  ]
})
export class PlaylistComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private playlistUseCase = inject(PlaylistsUseCase);

  dominantColor = 'rgb(30,30,30)';

  // 🔥 RESOURCE
  playlistResource = useResource<{
    playlist: OnePlaylistModel;
    songs: TrackUIModel[];
  } | null>(null);

  // 🧠 DERIVED STATE

  playlist = computed(() => this.playlistResource.state().data?.playlist);

  songs = computed(() => this.playlistResource.state().data?.songs ?? []);

  totalDuration = computed(() => {
    const p = this.playlist();
    if (!p?.tracks?.items?.length) return '';

    const totalMs = p.tracks.items.reduce(
      (sum, t) => sum + (t.track?.duration_ms ?? 0),
      0
    );

    return formatDuration(totalMs);
  });

  description = computed(() => {
    const p = this.playlist();
    if (!p) return '';

    return `${p.owner.display_name} • ${p.tracks.total} songs • ${this.totalDuration()}`;
  });

  // 🚀 LOAD

  async loadPlaylist(id: string) {
    await this.playlistResource.load(
      async () => {
        const result = await lastValueFrom(
          this.playlistUseCase.getOnePlaylist(id)
        );

        const songs: TrackUIModel[] = result.tracks.items.map(track => ({
          albumImage: track.track.album.images[0]?.url,
          albumName: track.track.album.name,
          artists: track.track.artists.map(a => a.name).join(', '),
          duration: track.track.duration_ms,
          id: track.track.id,
          link: track.track.external_urls.spotify,
          title: track.track.name
        }));

        return {
          playlist: result,
          songs
        };
      },
      {
        isEmpty: data => !data,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  // 🔁 INIT

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadPlaylist(params['playlistId']);
    });
  }
}
