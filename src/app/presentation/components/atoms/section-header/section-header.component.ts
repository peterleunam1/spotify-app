import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [CommonModule],
  templateUrl: './section-header.component.html'
})
export class SectionHeaderComponent {
  @Input() title!: string;
  @Input() description?: string;
}
