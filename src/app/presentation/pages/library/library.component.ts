import { Component, inject, OnInit, signal } from '@angular/core';
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
import { GetTopItemsParams } from '../../../domain/profile/profile.entity';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TopItemsComponent } from '../../components/organisms/top-items/top-items.component';
import { PlaylistsUseCase } from '../../../application/playlists/playlists.use-case';
import { PlaylistItem } from '../../../domain/playlists/playlists.entity';
import { ListOfPlaylistsComponent } from '../../components/organisms/list-of-playlists/list-of-playlists.component';
import { TracksUseCase } from '../../../application/tracks/tracks.use-case';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { TimeRange } from '../../components/molecules/timer-ranger-selector/time-ranger-selector.component';

@Component({
  selector: 'app-library',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    TabsNavComponent,
    TopItemsComponent,
    CommonModule,
    ListOfPlaylistsComponent,
    ListOfSongsComponent
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
  public playlists = signal<PlaylistItem[]>([]);
  public isLoadingPlaylist = signal<boolean>(false);

  artists = signal<TopArtistsModel | null>(null);
  tracks = signal<TopTracksModel | null>(null);

  artistsLoading = signal(false);
  tracksLoading = signal(false);

  isLoadingMyLikedTracks = signal(false);

  likedTracksFromArtist: TrackUIModel[] = [];

  async getTopArtists(range: TimeRange) {
    this.artistsLoading.set(true);

    try {
      const params: GetTopItemsParams = {
        item: 'artists',
        timeRange: range
      };

      const result = await lastValueFrom(
        this.profileUseCase.getTopItems(params)
      );

      const topArtists = result as TopArtistsModel;

      this.artists.set(topArtists);
    } finally {
      this.artistsLoading.set(false);
    }
  }

  async getTopTracks(range: TimeRange) {
    this.tracksLoading.set(true);

    try {
      const params: GetTopItemsParams = {
        item: 'tracks',
        timeRange: range
      };

      const result = await lastValueFrom(
        this.profileUseCase.getTopItems(params)
      );
      this.tracks.set(result as TopTracksModel);
    } finally {
      this.tracksLoading.set(false);
    }
  }
  async getPlaylists() {
    this.isLoadingPlaylist.set(true);

    try {
      const result = await lastValueFrom(this.playlistUseCase.getPlaylists());
      this.playlists.set(result.items);
    } finally {
      this.isLoadingPlaylist.set(false);
    }
  }

  async getLikedTracks() {
    try {
      this.isLoadingMyLikedTracks.set(true);

      const tracks = await lastValueFrom(this.tracksUseCase.getMyTracks());

      this.likedTracksFromArtist = tracks
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
    } catch {
      throw new Error('An unexpected error has been ocurred.');
    } finally {
      this.isLoadingMyLikedTracks.set(false);
    }
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const tab = params.get('tab');

      if (this.isValidTab(tab)) {
        this.activeTab = tab;
      } else {
        this.setTab('artists', false);
      }
    });
    this.getTopTracks('short_term');
    this.getTopArtists('short_term');
    this.getPlaylists();
    this.getLikedTracks();
  }

  setTab(tab: LibraryTab, updateUrl = true) {
    this.activeTab = tab;

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
