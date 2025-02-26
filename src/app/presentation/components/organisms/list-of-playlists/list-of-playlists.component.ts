import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PlaylistComponent } from '../../molecules/playlist/playlist.component';
import { PlaylistItem } from '../../../../domain/playlists/playlists.entity';

@Component({
  selector: 'app-list-of-playlists',
  imports: [CommonModule, PlaylistComponent],
  templateUrl: './list-of-playlists.component.html',
  styleUrl: './list-of-playlists.component.css'
})
export class ListOfPlaylistsComponent {
  @Input() playlists: PlaylistItem[] = [];
  @Input() isLoading: boolean = false;
  @Input() isFollowed!: (id: string) => boolean;
  
  openPlaylist(url: string): void {
    window.open(url, '_blank');
  }

  toggleFollow(id: string): void {
    console.log(`Toggling follow for playlist ${id}`);
  }
}
