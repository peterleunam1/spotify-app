import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { lastValueFrom } from 'rxjs';
import { PlaylistItem } from '../../../domain/playlists/playlists.entity';
import { ProfileUseCase } from '../../../application/profile/profile.use-case';
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
import { useResource } from '../../../shared/state/use-resource';
import { mapDomainErrorToMessage } from '../../helpers/map-error';
import { ResourceStateComponent } from '../../components/organisms/resource-state/resource-state.component';
import { ModalComponent } from '../../components/atoms/modal/modal.component';
import { MainButtonComponent } from '../../components/atoms/main-button/main-button.component';
import { PUBLIC_ROUTES } from '../../constants/routes-storage.constant';
import { TokenUseCase } from '../../../application/token/token.use-case';

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
    CurrentlyPlayingComponent,
    ResourceStateComponent,
    ModalComponent,
    MainButtonComponent
  ]
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private profileUseCase = inject(ProfileUseCase);
  private tokenUseCase = inject(TokenUseCase);
  public playerUseCase = inject(PlayerUseCase);
  public errorMessages = signal<string>('');

  selectedArtistsRange: TimeRange = 'short_term';
  selectedTracksRange: TimeRange = 'short_term';

  radarChartTopGenres = signal<RadarChartData | null>(null);
  topGenres: { genre: string; count: number }[] = [];

  currentlyPlaying = signal<CurrentlyPlayingModel | null>(null);

  public tracksResource = useResource<TopTracksModel | null>(null);
  public artistResources = useResource<TopArtistsModel | null>(null);
  public playlistsResource = useResource<PlaylistItem[], string>([]);
  public recentlyPlayedResource = useResource<RecentlyPlayedTrackModel[]>([]);
  recentlyPlayed = signal<TrackUIModel[]>([]);

  isErrorPlaying = signal<boolean>(false);

  async getTopArtists(range: TimeRange) {
    await this.artistResources.load(
      async () => {
        const result = await lastValueFrom(
          this.profileUseCase.getTopItems({
            item: 'artists',
            timeRange: range
          })
        );
        const topArtists = result as TopArtistsModel;

        this.topGenres = getTopGenres(topArtists.items);
    console.log(this.topGenres);

        this.radarChartTopGenres.set({
          title: 'Top Genres',
          labels: this.topGenres.map(genre => genre.genre),
          values: this.topGenres.map(genre => genre.count)
        });
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

  async getRecentlyPlayed() {
    await this.recentlyPlayedResource.load(
      async () => {
        const result = await lastValueFrom(
          this.playerUseCase.getRecentlyPlayed()
        );
        const recently = RecentlyPlayedMapper.toModel(result);
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
        return recently;
      },
      {
        isEmpty: data => !data || data.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  async getCurrentlyPlaying() {
    try {
      const result = await lastValueFrom(
        this.playerUseCase.getCurrentlyPlayingTrack()
      );
      const currentPlaying = CurrentlyPlayingMapper.toModel(result);
      this.currentlyPlaying.set(currentPlaying);
    } catch (error) {
      this.isErrorPlaying.set(true);
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
  logout() {
    this.tokenUseCase.removeToken();
    this.router.navigate([PUBLIC_ROUTES.SIGN_IN]);
  }

  ngOnInit() {
    this.getTopTracks('short_term');
    this.getTopArtists('short_term');
    this.getRecentlyPlayed();
    this.getCurrentlyPlaying();
  }
}
