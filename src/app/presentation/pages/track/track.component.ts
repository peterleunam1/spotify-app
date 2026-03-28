import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksUseCase } from '../../../application/tracks/tracks.use-case';
import { lastValueFrom } from 'rxjs';
import { SingleTrackModel } from '../../../domain/tracks/tracks.entity';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { PercentageBarComponent } from '../../components/atoms/percentage-bar/percentage-bar/percentage-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track',
  imports: [
    CommonModule,
    MainLayoutComponent,
    NavbarComponent,
    SpotifyHeroComponent,
    PercentageBarComponent
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tracksUseCase = inject(TracksUseCase);
  dominantColor = 'rgb(30,30,30)';
  track = {} as SingleTrackModel;
  isLoading = false;
  async getTrack(trackId: string) {
    this.isLoading = true;
    try {
      const result = await lastValueFrom(
        this.tracksUseCase.singleTrack(trackId)
      );
      this.track = result;
    } catch {
      throw new Error('An unexpected error has been ocurred.');
    } finally{
      this.isLoading = false;
    }
  }
  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getTrack(params['trackId']);
    });
  }
}
