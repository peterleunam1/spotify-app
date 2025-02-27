import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [CommonModule]
})
export class ModalComponent {
  @Input() isOpen!: boolean;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
