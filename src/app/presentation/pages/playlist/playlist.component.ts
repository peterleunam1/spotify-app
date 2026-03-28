import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { PlaylistsUseCase } from '../../../application/playlists/playlists.use-case';
import { OnePlaylistModel } from '../../../domain/playlists/playlists.entity';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SpotifyHeroComponent } from '../../components/organisms/spotify-hero/spotify-hero.component';
import { formatDuration } from '../../helpers/get-format-duration';
import { ListOfSongsComponent } from '../../components/organisms/list-of-songs/list-of-songs.component';
import { TrackUIModel } from '../../../domain/tracks/tracks.entity';

@Component({
  selector: 'app-playlist',
  imports: [
    MainLayoutComponent,
    NavbarComponent,
    SpotifyHeroComponent,
    ListOfSongsComponent
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  dominantColor = 'rgb(30,30,30)';
  private route = inject(ActivatedRoute);
  private playlistUseCase = inject(PlaylistsUseCase);
  playlist = signal<OnePlaylistModel | null>(null);
  isLoading = signal<boolean>(false);
  songs = signal<TrackUIModel[]>([]);

  async getPlaylist(playlistId: string) {
    try {
      this.isLoading.set(true);
      const result = await lastValueFrom(
        this.playlistUseCase.getOnePlaylist(playlistId)
      );
      this.playlist.set(result);
      const normalizedTracks: TrackUIModel[] = result.tracks.items.map(
        track => ({
          albumImage: track.track.album.images[0].url,
          albumName: track.track.album.name,
          artists: track.track.artists.map(a => a.name).join(', '),
          duration: track.track.duration_ms,
          id: track.track.id,
          link: track.track.external_urls.spotify,
          title: track.track.name
        })
      );
      this.songs.set(normalizedTracks);
    } catch {
      throw new Error('An unexpected error has been ocurred.');
    } finally {
      this.isLoading.set(false);
    }
  }

  get totalDuration(): string {
    const tracks = this.playlist()?.tracks?.items;
    if (!tracks?.length) return '';
    const totalMs = tracks.reduce(
      (sum, t) => sum + (t.track?.duration_ms ?? 0),
      0
    );
    return formatDuration(totalMs);
  }

  get description(): string {
    return (
      this.playlist()?.owner.display_name +
      ' • ' +
      this.playlist()?.tracks.total +
      ' songs • ' +
      this.totalDuration
    );
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPlaylist(params['playlistId']);
    });
  }
}
