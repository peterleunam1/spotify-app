import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PlaylistComponent } from '../../molecules/playlist/playlist.component';
import { PlaylistItem } from '../../../../domain/playlists/playlists.entity';

@Component({
  selector: 'app-list-of-playlists',
  imports: [CommonModule, PlaylistComponent],
  templateUrl: './list-of-playlists.component.html'
})
export class ListOfPlaylistsComponent {
  @Input() playlists: PlaylistItem[] = [];
  @Input() isLoading = false;

  openPlaylist(url: string): void {
    window.open(url, '_blank');
  }
}
