import { Component, Input } from '@angular/core';
import { AlbumInfo } from '../../../../domain/albums/albums.entity';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../atoms/modal/modal.component';
import { ListOfSongsComponent } from "../../organisms/list-of-songs/list-of-songs.component";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
  imports: [CommonModule, ModalComponent, ListOfSongsComponent]
})
export class AlbumComponent {
  @Input() album: AlbumInfo = {
    id: '',
    name: '',
    coverImage: '',
    releaseYear:0,
    artistName: ''
  };
  isModalOpen = false;
  
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
