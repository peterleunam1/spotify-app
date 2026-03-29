import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [CommonModule],
  templateUrl: './skeleton.component.html'
})
export class SkeletonComponent {
 @Input() count = 10;
 @Input() type: 'card' | 'circle' | 'text' | 'song' | 'big-circle' = 'card';
}
