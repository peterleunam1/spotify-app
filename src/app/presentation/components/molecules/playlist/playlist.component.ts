import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlaylistItem } from '../../../../domain/playlists/playlists.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  @Input() playlist: PlaylistItem = {} as PlaylistItem;
  @Input() isFollowed: (id: string) => boolean = () => false;
  @Output() playlistClick = new EventEmitter<string>();
  @Output() followToggle = new EventEmitter<string>();

  openPlaylist(url: string): void {
    this.playlistClick.emit(url);
  }

  toggleFollow(event: Event): void {
    event.stopPropagation();
    this.followToggle.emit(this.playlist.id);
  }
}
