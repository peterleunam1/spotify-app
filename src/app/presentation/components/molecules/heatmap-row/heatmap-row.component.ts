import { Component, Input } from '@angular/core';
import { HeatmapCellComponent } from '../../atoms/heatmap-cell/heatmap-cell.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heatmap-row',
  imports: [HeatmapCellComponent, CommonModule],
  templateUrl: './heatmap-row.component.html',
  styleUrl: './heatmap-row.component.css'
})
export class HeatmapRowComponent {
  @Input() hour!: number;
  @Input() cells!: number[];
}
