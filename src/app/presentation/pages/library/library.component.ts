import { Component, inject, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import {
  LibraryTab,
  TabsNavComponent
} from '../../components/molecules/tabs-nav/tabs-nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileUseCase } from '../../../application/profile/profile.use-case';
import { TopArtistsModel } from '../../../domain/artist/artist.entity';
import {
  TopTracksModel,
  TrackUIModel
} from '../../../domain/tracks/tracks.entity';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TopItemsComponent } from '../../components/organisms/top-items/top-items.component';
import { PlaylistsUseCase } from '../../../application/playlists/playlists.use-case';
import { PlaylistItem } from '../../../domain/playlists/playlists.entity';
import { ListOfPlaylistsComponent } from '../../components/organisms/list-of-playlists/list-of-playlists.component';
import { TracksUseCase } from '../../../application/tracks/tracks.use-case';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { TimeRange } from '../../components/molecules/timer-ranger-selector/time-ranger-selector.component';
import { useResource } from '../../../shared/state/use-resource';
import { mapDomainErrorToMessage } from '../../helpers/map-error';
import { ResourceStateComponent } from '../../components/organisms/resource-state/resource-state.component';
import { SectionHeaderComponent } from '../../components/atoms/section-header/section-header.component';

@Component({
  selector: 'app-library',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    TabsNavComponent,
    TopItemsComponent,
    CommonModule,
    ListOfPlaylistsComponent,
    ListOfSongsComponent,
    ResourceStateComponent,
    SectionHeaderComponent
  ],
  templateUrl: './library.component.html'
})
export class LibraryComponent implements OnInit {
  activeTab: LibraryTab = 'artists';

  private profileUseCase = inject(ProfileUseCase);
  private playlistUseCase = inject(PlaylistsUseCase);
  private tracksUseCase = inject(TracksUseCase);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public playlistsResource = useResource<PlaylistItem[], string>([]);
  public tracksResource = useResource<TopTracksModel | null>(null);
  public artistResources = useResource<TopArtistsModel | null>(null);
  public likedTracksResource = useResource<TrackUIModel[]>([]);

  async getTopArtists(range: TimeRange) {
    await this.artistResources.load(
      async () => {
        const result = await lastValueFrom(
          this.profileUseCase.getTopItems({
            item: 'artists',
            timeRange: range
          })
        );
        return result as TopArtistsModel;
      },
      {
        isEmpty: data => !data || data.items.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  async getTopTracks(range: TimeRange): Promise<void> {
    await this.tracksResource.load(
      async () => {
        const result = await lastValueFrom(
          this.profileUseCase.getTopItems({
            item: 'tracks',
            timeRange: range
          })
        );
        return result as TopTracksModel;
      },
      {
        isEmpty: data => !data || data.items.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }
  async getPlaylists(): Promise<void> {
    await this.playlistsResource.load(
      async () => {
        const result = await lastValueFrom(this.playlistUseCase.getPlaylists());
        return result?.items ?? [];
      },
      {
        isEmpty: items => items.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  async getLikedTracks(): Promise<void> {
    await this.likedTracksResource.load(
      async () => {
        const tracks = await lastValueFrom(this.tracksUseCase.getMyTracks());

        return tracks.map(track => ({
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
        isEmpty: items => items.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  private loadTabData(tab: LibraryTab) {
  switch (tab) {
    case 'artists':
      if (!this.artistResources.state().data) {
        this.getTopArtists('short_term');
      }
      break;

    case 'tracks':
      if (!this.tracksResource.state().data) {
        this.getTopTracks('short_term');
      }
      break;

    case 'playlists':
      if (!this.playlistsResource.state().data.length) {
        this.getPlaylists();
      }
      break;

    case 'liked':
      if (!this.likedTracksResource.state().data.length) {
        this.getLikedTracks();
      }
      break;
  }
}
ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const tab = params.get('tab');

    if (this.isValidTab(tab)) {
      this.activeTab = tab;
    } else {
      this.activeTab = 'artists';
    }
    this.loadTabData(this.activeTab);
  });
}
setTab(tab: LibraryTab, updateUrl = true) {
  this.activeTab = tab;
  this.loadTabData(tab);

  if (updateUrl) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge'
    });
  }
}

  private isValidTab(tab: string | null): tab is LibraryTab {
    return ['artists', 'tracks', 'playlists', 'liked'].includes(tab || '');
  }
}
