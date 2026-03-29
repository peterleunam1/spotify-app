import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { PlaylistsUseCase } from '../../../application/playlists/playlists.use-case';
import { lastValueFrom } from 'rxjs';
import { PlaylistItem } from '../../../domain/playlists/playlists.entity';
import { PlaylistsError } from '../../../domain/playlists/playlists.errors';
import { ProfileUseCase } from '../../../application/profile/profile.use-case';
import { GetTopItemsParams } from '../../../domain/profile/profile.entity';
import { TopItemsComponent } from '../../components/organisms/top-items/top-items.component';
import { TopArtistsModel } from '../../../domain/artist/artist.entity';
import {
  TopTracksModel,
  TrackUIModel
} from '../../../domain/tracks/tracks.entity';
import {
  RadarChartComponent,
  RadarChartData
} from '../../components/atoms/radar-chart/radar-chart.component';
import { getTopGenres } from '../../helpers/get-top-genres';
import { CardComponent } from '../../components/atoms/card/card.component';
import { SectionHeaderComponent } from '../../components/atoms/section-header/section-header.component';
import {
  CurrentlyPlayingModel,
  RecentlyPlayedTrackModel
} from '../../../domain/player/player.entity';
import { PlayerUseCase } from '../../../application/player/player.use-case';
import { RecentlyPlayedMapper } from '../../../application/player/recently-player-mapper';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { CurrentlyPlayingMapper } from '../../../application/player/currently-playing-mapper';
import { CurrentlyPlayingComponent } from '../../components/molecules/currently-playing/currently-playing.component';
import { RepeatAndStatsComponent } from '../../components/organisms/repeat-and-stats/repeat-and-stats.component';
import { TimeRange } from '../../components/molecules/timer-ranger-selector/time-ranger-selector.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    NavbarComponent,
    TopItemsComponent,
    RepeatAndStatsComponent,
    RadarChartComponent,
    CardComponent,
    SectionHeaderComponent,
    ListOfSongsComponent,
    CurrentlyPlayingComponent
  ]
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private playlistUseCase = inject(PlaylistsUseCase);
  private profileUseCase = inject(ProfileUseCase);

  public playlists = signal<PlaylistItem[]>([]);
  public playerUseCase = inject(PlayerUseCase);
  public isLoading = signal<boolean>(false);
  public errorMessages = signal<string>('');

  isLoadingTop = false;
  artists = signal<TopArtistsModel | null>(null);
  tracks = signal<TopTracksModel | null>(null);
  artistsLoading = signal(false);
  tracksLoading = signal(false);
  selectedArtistsRange: TimeRange = 'short_term';
  selectedTracksRange: TimeRange = 'short_term';

  radarChartTopGenres = signal<RadarChartData | null>(null);
  topGenres: { genre: string; count: number }[] = [];

  recentlyPlayed = signal<TrackUIModel[]>([]);
  recentlyPlayedTracks = signal<RecentlyPlayedTrackModel[]>([]);
  recentPlayedLoading = signal(false);

  currentlyPlaying = signal<CurrentlyPlayingModel | null>(null);

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

      this.topGenres = getTopGenres(topArtists.items);

      this.radarChartTopGenres.set({
        title: 'Top Genres',
        labels: this.topGenres.map(genre => genre.genre),
        values: this.topGenres.map(genre => genre.count)
      });

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
    this.isLoading.set(true);
    this.errorMessages.set('');

    try {
      this.recentPlayedLoading.set(true);
      const result = await lastValueFrom(this.playlistUseCase.getPlaylists());
      this.playlists.set(result.items);
    } catch (error) {
      this.errorMessages.set((error as PlaylistsError).message);
    } finally {
      this.isLoading.set(false);
      this.recentPlayedLoading.set(false);
    }
  }

  async getRecentlyPlayed() {
    try {
      const result = await lastValueFrom(
        this.playerUseCase.getRecentlyPlayed()
      );
      const recently = RecentlyPlayedMapper.toModel(result);
      this.recentlyPlayedTracks.set(recently);
      const normalizedTracks: TrackUIModel[] = recently.map(track => ({
        id: track.id,
        title: track.name,
        albumName: track.artist,
        albumImage: track.albumImage,
        artists: track.artist,
        link: track.spotifyUrl,
        timeAgo: track.playedAgo
      }));

      this.recentlyPlayed.set(normalizedTracks);
    } catch (error) {
      console.error(error);
    }
  }

  async getCurrentlyPlaying() {
    try {
      const result = await lastValueFrom(
        this.playerUseCase.getCurrentlyPlayingTrack()
      );
      const currentPlaying = CurrentlyPlayingMapper.toModel(result);
      this.currentlyPlaying.set(currentPlaying);
    } catch (error) {
      console.error(error);
    }
  }

  openPlaylist(url: string) {
    window.open(url, '_blank');
  }

  goToLibraryTracks() {
  this.router.navigate(['/library'], {
    queryParams: { tab: 'tracks' }
  });
}

goToLibraryArtists() {
  this.router.navigate(['/library'], {
    queryParams: { tab: 'artists' }
  });
}
  ngOnInit() {
    this.getPlaylists();
    this.getTopTracks('short_term');
    this.getTopArtists('short_term');
    this.getRecentlyPlayed();
    this.getCurrentlyPlaying();
  }
}
