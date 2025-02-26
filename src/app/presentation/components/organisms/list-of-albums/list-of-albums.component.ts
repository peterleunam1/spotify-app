import { Component, Input, OnChanges } from '@angular/core';
import { AlbumComponent } from '../../molecules/album/album.component';
import { AlbumInfo } from '../../../../domain/albums/albums.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-albums',
  templateUrl: './list-of-albums.component.html',
  styleUrl: './list-of-albums.component.css',
  imports: [CommonModule, AlbumComponent]
})
export class ListOfAlbumsComponent implements OnChanges {
  @Input() albums: AlbumInfo[] = [];
  artistName: string = 'Unknown Artist';

  ngOnChanges() {
    if (this.albums.length > 0) {
      this.artistName = this.albums[0]?.artistName || 'Unknown Artist';
    }
  }
}

