import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
  imports: [CommonModule]
})
export class MainButtonComponent {
  @Input() label: string = 'Button';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.isLoading && !this.disabled) {
      this.buttonClick.emit();
    }
  }

}
