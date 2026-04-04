import { Component, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

import { TracksUseCase } from '../../../application/tracks/tracks.use-case';
import { SingleTrackModel } from '../../../domain/tracks/tracks.entity';

import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { PercentageBarComponent } from '../../components/atoms/percentage-bar/percentage-bar.component';

import { useResource } from '../../../shared/state/use-resource';
import { mapDomainErrorToMessage } from '../../helpers/map-error';
import { ResourceStateComponent } from '../../components/organisms/resource-state/resource-state.component';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    NavbarComponent,
    SpotifyHeroComponent,
    PercentageBarComponent,
    ResourceStateComponent
  ],
  templateUrl: './track.component.html'
})
export class TrackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tracksUseCase = inject(TracksUseCase);

  dominantColor = 'rgb(30,30,30)';

  // 🔥 RESOURCE
  trackResource = useResource<SingleTrackModel | null>(null);

  // 🧠 DERIVED STATE

  track = computed(() => this.trackResource.state().data);

  artistsNames = computed(() => {
    const t = this.track();
    if (!t?.artists) return '';
    return t.artists.map(a => a.name).join(', ');
  });

  duration = computed(() => {
    const ms = this.track()?.duration_ms;
    if (!ms) return '';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });

  // open track

  openTrack() {
    const url = this.track()?.external_urls.spotify;
    if (url) window.open(url, '_blank');
  }

  // 🚀 LOAD

  async loadTrack(trackId: string) {
    await this.trackResource.load(
      async () => {
        const result = await lastValueFrom(
          this.tracksUseCase.singleTrack(trackId)
        );
        return result;
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
      this.loadTrack(params['trackId']);
    });
  }
}
