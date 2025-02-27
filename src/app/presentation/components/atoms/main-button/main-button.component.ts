import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  imports: [CommonModule]
})
export class MainButtonComponent {
  @Input() label = 'Button';
  @Input() isLoading = false;
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.isLoading && !this.disabled) {
      this.buttonClick.emit();
    }
  }
}
