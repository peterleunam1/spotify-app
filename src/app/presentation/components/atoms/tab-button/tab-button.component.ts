import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab-button',
  imports: [CommonModule],
  templateUrl: './tab-button.component.html',
  styleUrl: './tab-button.component.css'
})
export class TabButtonComponent {
  @Input() label = '';
  @Input() active = false;
  @Output() select = new EventEmitter<void>();
  @Input() variant: 'primary' | 'subtle' = 'primary';
  onClick() {
    this.select.emit();
  }
}
