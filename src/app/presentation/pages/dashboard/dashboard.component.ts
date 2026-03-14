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
import { TimeRange } from '../../components/molecules/timer-ranger-selector/time-ranger-selector/time-ranger-selector.component';
import { TopItemsComponent } from '../../components/organisms/top-items/top-items/top-items.component';
import { TopArtistsModel } from '../../../domain/artist/artist.entity';
import {
  MusicPersonality,
  TopTracksModel,
  TrackUIModel
} from '../../../domain/tracks/tracks.entity';
import { mapTracksToMusicDNA } from '../../../application/tracks/music-dna-mapper';
import {
  RadarChartComponent,
  RadarChartData
} from '../../components/atoms/radar-chart/radar-chart/radar-chart.component';
import { getMusicPersonality } from '../../helpers/get-music-personality';
import { MusicDnaComponent } from '../../components/organisms/music-dna/music-dna.component';
import { getTopGenres } from '../../helpers/get-top-genres';
import { CardComponent } from '../../components/atoms/card/card.component';
import { SectionHeaderComponent } from '../../components/atoms/section-header/section-header.component';
import { RecentlyPlayedTrackModel } from '../../../domain/player/player.entity';
import { PlayerUseCase } from '../../../application/player/player.use-case';
import { RecentlyPlayedMapper } from '../../../application/player/recently-player-mapper';
import { title } from 'process';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    NavbarComponent,
    TopItemsComponent,
    MusicDnaComponent,
    RadarChartComponent,
    CardComponent,
    SectionHeaderComponent,
    ListOfSongsComponent
  ]
})
export class DashboardComponent implements OnInit {
  private playlistUseCase = inject(PlaylistsUseCase);
  public playlists = signal<PlaylistItem[]>([]);
  public playerUseCase = inject(PlayerUseCase);
  public isLoading = signal<boolean>(false);
  public errorMessages = signal<string>('');
  isLoadingTop = false;

  private profileUseCase = inject(ProfileUseCase);

  artists = signal<TopArtistsModel | null>(null);
  tracks = signal<TopTracksModel | null>(null);

  artistsLoading = signal(false);
  tracksLoading = signal(false);

  selectedArtistsRange: TimeRange = 'short_term';
  selectedTracksRange: TimeRange = 'short_term';

  radarChartData = signal<RadarChartData | null>(null);
  radarChartTopGenres = signal<RadarChartData | null>(null);
  musicInsights = signal<string[]>([]);

  personality = signal<MusicPersonality | null>(null);

  topGenres: { genre: string; count: number }[] = [];

  recentlyPlayed = signal<TrackUIModel[]>([]);
  recentPlayedLoading = signal(false);

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
      const dna = mapTracksToMusicDNA(result as TopTracksModel);
      this.radarChartData.set({
        title: 'Your Music DNA',
        labels: [
          'Energy',
          'Mainstream',
          'Freshness',
          'Intensity',
          'Explicit',
          'Variety'
        ],
        values: [
          dna.energy,
          dna.mainstream,
          dna.freshness,
          dna.intensity,
          dna.explicitness,
          dna.variety
        ]
      });

      const insights: string[] = [];

      if (dna.energy > 0.7) {
        insights.push('🔥 High energy listener');
      }

      if (dna.mainstream > 0.6) {
        insights.push('🎤 Loves popular music');
      }

      if (dna.variety > 0.5) {
        insights.push('🌍 Diverse artist taste');
      }

      if (dna.explicitness > 0.4) {
        insights.push('🧨 Enjoys explicit tracks');
      }

      if (dna.freshness > 0.6) {
        insights.push('🆕 Likes recent music');
      }

      this.musicInsights.set(insights);
      const personality = getMusicPersonality(dna);

      this.personality.set(personality);
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

  openPlaylist(url: string) {
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.getPlaylists();
    this.getTopTracks('short_term');
    this.getTopArtists('short_term');
    this.getRecentlyPlayed();
    // this.getTopTracks();
  }
}
