import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

@Component({
  selector: 'app-time-ranger-selector',
  imports: [CommonModule],
  templateUrl: './time-ranger-selector.component.html',
  styleUrl: './time-ranger-selector.component.css'
})
export class TimeRangerSelectorComponent {
  @Output() rangeChange = new EventEmitter<TimeRange>();
  selectedRange: TimeRange = 'short_term';

  onChange(range: string) {
    const typedRange = range as TimeRange; // Aquí haces el cast
    this.selectedRange = typedRange;
    this.rangeChange.emit(typedRange);
  }
}
