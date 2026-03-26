import { Component, inject, OnInit, signal } from '@angular/core';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { RadarChartData } from '../../components/atoms/radar-chart/radar-chart/radar-chart.component';
import {
  MusicPersonality,
  TopTracksModel
} from '../../../domain/tracks/tracks.entity';
import { getMusicPersonality } from '../../helpers/get-music-personality';
import { TimeRange } from '../../components/molecules/timer-ranger-selector/time-ranger-selector/time-ranger-selector.component';
import { GetTopItemsParams } from '../../../domain/profile/profile.entity';
import { lastValueFrom } from 'rxjs';
import { ProfileUseCase } from '../../../application/profile/profile.use-case';
import { mapTracksToMusicDNA } from '../../../application/tracks/music-dna-mapper';
import { CommonModule } from '@angular/common';
import { MyMusicDnaComponent } from '../../components/organisms/music-dna/music-dna.component';
import { PlayerUseCase } from '../../../application/player/player.use-case';
import { RecentlyPlayedTrackModel } from '../../../domain/player/player.entity';
import { RecentlyPlayedMapper } from '../../../application/player/recently-player-mapper';

@Component({
  selector: 'app-music-dna-page',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    CommonModule,
    MyMusicDnaComponent
  ],
  templateUrl: './music-dna.component.html',
  styleUrl: './music-dna.component.css'
})
export class MusicDnaComponent implements OnInit {
  private profileUseCase = inject(ProfileUseCase);
  private playerUseCase = inject(PlayerUseCase);

  radarChartData = signal<RadarChartData | null>(null);
  musicInsights = signal<string[]>([]);
  tracksLoading = signal<boolean>(false);
  personality = signal<MusicPersonality | null>(null);

  recentlyPlayedTracks = signal<RecentlyPlayedTrackModel[]>([]);
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

  async getRecentlyPlayed() {
    try {
      const result = await lastValueFrom(
        this.playerUseCase.getRecentlyPlayed()
      );
      const recently = RecentlyPlayedMapper.toModel(result);
      this.recentlyPlayedTracks.set(recently);
    } catch (error) {
      console.error(error);
    }
  }
  ngOnInit() {
    this.getTopTracks('long_term');
    this.getRecentlyPlayed();
  }
}
