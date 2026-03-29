import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-percentage-bar',
  imports: [],
  templateUrl: './percentage-bar.component.html'
})
export class PercentageBarComponent {
  @Input() percentage = 0;
  @Input() title = '';
}
