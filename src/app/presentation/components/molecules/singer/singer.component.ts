import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleSingerModel } from '../../../../domain/singers/singer.entity';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { saveRecentSearch } from '../../../helpers/get-recent-searches';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  imports: [RouterModule, CommonModule]
})
export class SingerComponent {
  @Input() singer: SingleSingerModel = {
    id: '',
    name: '',
    image: '',
    followers: 0,
    genres: [],
    type: 'artist',
    artistNamefromAlbum: '',
    singerNameFromTrack: ''
  };

    @Input()
  showRemoveButton = false;
@Input() showRank?: boolean = false; // mostrar ranking tipo Wrapped
@Input() rank?: number; // posición en top artists
@Input() highlightOnHover?: boolean = true; // escala y sombra al hover
@Input() showGenres?: boolean = false; // mostrar géneros del artista
@Input() showLinkIcon?: boolean = false; // ícono de Spotify al lado del nombre
@Input() isSmall?: boolean = false; // versión más compacta para playlists
  // 🔹 evento para eliminar
  @Output()
  remove = new EventEmitter<string>();

  handleRemove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.remove.emit(this.singer.id);
  }


formatGenres(genres?: string[]): string {
  if (!genres || genres.length === 0) return 'No genres specified';

  const formattedGenres = genres.map(g => g.charAt(0).toUpperCase() + g.slice(1));
  return formattedGenres.length > 3
    ? `${formattedGenres.slice(0, 2).join(', ')} etc.`
    : formattedGenres.join(', ');
}
  handleClick() {
  saveRecentSearch(this.singer);
}
}
