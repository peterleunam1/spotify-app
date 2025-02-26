import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(newValue);
  }
}
