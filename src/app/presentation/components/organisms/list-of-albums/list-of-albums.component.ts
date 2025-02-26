import { Component, Input } from '@angular/core';
import { AlbumComponent } from "../../molecules/album/album.component";
import { AlbumInfo } from '../../../../domain/albums/albums.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-albums',
  templateUrl: './list-of-albums.component.html',
  styleUrl: './list-of-albums.component.css',
  imports: [CommonModule, AlbumComponent]
})
export class ListOfAlbumsComponent {
  @Input() albums: AlbumInfo[] = [];
}
