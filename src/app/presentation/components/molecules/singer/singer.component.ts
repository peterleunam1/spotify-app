import { Component, Input } from '@angular/core';
import { SingleSingerModel } from '../../../../domain/singers/singer.entity';
import { RouterLink, RouterModule } from '@angular/router';
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
  }
}
