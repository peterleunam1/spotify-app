import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TabButtonComponent } from '../../atoms/tab-button/tab-button.component';

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

@Component({
  selector: 'app-time-ranger-selector',
  imports: [CommonModule, TabButtonComponent],
  templateUrl: './time-ranger-selector.component.html',
  styleUrl: './time-ranger-selector.component.css'
})
export class TimeRangerSelectorComponent {
  @Output() rangeChange = new EventEmitter<TimeRange>();

  selectedRange: TimeRange = 'short_term';

  ranges: { label: string; value: TimeRange }[] = [
    { label: '4 Weeks', value: 'short_term' },
    { label: '6 Months', value: 'medium_term' },
    { label: 'All Time', value: 'long_term' }
  ];

  onChange(range: TimeRange) {
    this.selectedRange = range;
    this.rangeChange.emit(range);
  }
}
