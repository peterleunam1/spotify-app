import { Component, Input } from '@angular/core';
import { SingleSingerModel } from '../../../../domain/singers/singer.entity';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrl: './singer.component.css',
  imports: [RouterModule, CommonModule]
})
export class SingerComponent {
  @Input() singer: SingleSingerModel  = {
    id: '',
    name: '',
    image: '',
    followers: 0,
    genres: []
  };

  formatGenres(genres: string[]): string {
    if (!genres || genres.length === 0) return 'No genres specified';
  
    // Capitaliza los géneros y limita la cantidad de palabras visibles
    const formattedGenres = genres.map(g => g.charAt(0).toUpperCase() + g.slice(1));
    
    return formattedGenres.length > 3
      ? `${formattedGenres.slice(0, 2).join(', ')} etc.` 
      : formattedGenres.join(', ');
  }
  
}
