import { Component, Input } from '@angular/core';
import { AlbumInfo } from '../../../../domain/albums/albums.entity';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  imports: [CommonModule, RouterModule]
})
export class AlbumComponent {
  @Input() album: AlbumInfo = {
    id: '',
    name: '',
    coverImage: '',
    releaseYear: 0,
    artistName: ''
  };
}
