import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { MyMusicDnaComponent } from '../../components/organisms/music-dna/music-dna.component';

import { ProfileUseCase } from '../../../application/profile/profile.use-case';
import { PlayerUseCase } from '../../../application/player/player.use-case';

import { lastValueFrom } from 'rxjs';

import {
  MusicPersonality,
  TopTracksModel
} from '../../../domain/tracks/tracks.entity';

import { GetTopItemsParams } from '../../../domain/profile/profile.entity';
import { TimeRange } from '../../components/molecules/timer-ranger-selector/time-ranger-selector.component';

import { mapTracksToMusicDNA } from '../../../application/tracks/music-dna-mapper';
import { getMusicPersonality } from '../../helpers/get-music-personality';
import { RecentlyPlayedMapper } from '../../../application/player/recently-player-mapper';
import { RecentlyPlayedTrackModel } from '../../../domain/player/player.entity';

import { useResource } from '../../../shared/state/use-resource';
import { mapDomainErrorToMessage } from '../../helpers/map-error';
import { ResourceStateComponent } from '../../components/organisms/resource-state/resource-state.component';

@Component({
  selector: 'app-music-dna-page',
  standalone: true,
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    CommonModule,
    MyMusicDnaComponent,
    ResourceStateComponent
  ],
  templateUrl: './music-dna.component.html'
})
export class MusicDnaComponent implements OnInit {
  private profileUseCase = inject(ProfileUseCase);
  private playerUseCase = inject(PlayerUseCase);

  // 🔥 RESOURCE PRINCIPAL
  tracksResource = useResource<{
    dna: ReturnType<typeof mapTracksToMusicDNA>;
    personality: MusicPersonality;
    insights: string[];
  } | null>(null);

  // 🔥 RESOURCE SECUNDARIO
  recentlyPlayedResource = useResource<RecentlyPlayedTrackModel[]>([]);

  // 🧠 DERIVED STATE (nivel senior)
  radarChartData = computed(() => {
    const data = this.tracksResource.state().data;
    if (!data) return null;

    const dna = data.dna;

    return {
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
    };
  });

  personality = computed(
    () => this.tracksResource.state().data?.personality ?? null
  );

  musicInsights = computed(
    () => this.tracksResource.state().data?.insights ?? []
  );

  // 🚀 LOADERS

  async getTopTracks(range: TimeRange) {
    await this.tracksResource.load(
      async () => {
        const params: GetTopItemsParams = {
          item: 'tracks',
          timeRange: range
        };

        const result = await lastValueFrom(
          this.profileUseCase.getTopItems(params)
        );

        const dna = mapTracksToMusicDNA(result as TopTracksModel);

        const insights: string[] = [];

        if (dna.energy > 0.7) insights.push('🔥 High energy listener');
        if (dna.mainstream > 0.6) insights.push('🎤 Loves popular music');
        if (dna.variety > 0.5) insights.push('🌍 Diverse artist taste');
        if (dna.explicitness > 0.4) insights.push('🧨 Enjoys explicit tracks');
        if (dna.freshness > 0.6) insights.push('🆕 Likes recent music');

        return {
          dna,
          personality: getMusicPersonality(dna),
          insights
        };
      },
      {
        isEmpty: data => !data,
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

        return RecentlyPlayedMapper.toModel(result);
      },
      {
        isEmpty: data => !data || data.length === 0,
        mapError: mapDomainErrorToMessage
      }
    );
  }

  ngOnInit() {
    this.getTopTracks('long_term');
    this.getRecentlyPlayed();
  }
}
