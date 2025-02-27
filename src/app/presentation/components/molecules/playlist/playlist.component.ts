import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { PlaylistItem } from '../../../../domain/playlists/playlists.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  imports: [CommonModule],
  templateUrl: './playlist.component.html'
})
export class PlaylistComponent {
  @Input() playlist: PlaylistItem = {} as PlaylistItem;
  @Output() playlistClick = new EventEmitter<string>();

  public playlistImage = computed(() => {
    return this.playlist.images
      ? this.playlist.images[0].url
      : '/assets/images/playlist-base.jpg';
  });

  openPlaylist(url: string): void {
    this.playlistClick.emit(url);
  }
}
