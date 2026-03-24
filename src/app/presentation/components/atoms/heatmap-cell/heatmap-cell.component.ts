import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heatmap-cell',
  imports: [CommonModule],
  templateUrl: './heatmap-cell.component.html',
  styleUrl: './heatmap-cell.component.css'
})
export class HeatmapCellComponent {
@Input() count = 0;

get color(): string {

  if (this.count === 0) return 'bg-neutral-800';
  if (this.count < 2) return 'bg-green-900';
  if (this.count < 4) return 'bg-green-700';
  if (this.count < 6) return 'bg-green-500';

  return 'bg-green-400';
}
}
