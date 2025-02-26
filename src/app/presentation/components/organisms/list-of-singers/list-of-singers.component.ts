import { Component, Input } from '@angular/core';
import { SingleSingerModel } from '../../../../domain/singers/singer.entity';
import { SingerComponent } from '../../molecules/singer/singer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-singers',
  templateUrl: './list-of-singers.component.html',
  styleUrl: './list-of-singers.component.css',
  imports: [SingerComponent, CommonModule]
})
export class ListOfSingersComponent {
  @Input() singers: SingleSingerModel[] = [];
}
