import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import Chart from 'chart.js/auto';

export interface RadarChartData {
  labels: string[];
  values: number[];
  title?: string;
}
@Component({
  selector: 'app-radar-chart',
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent implements AfterViewInit {
  @Input({ required: true })
  data!: RadarChartData;

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement;

    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: this.data.title ?? 'Music DNA',
            data: this.data.values,
            backgroundColor: 'rgba(29,185,84,0.15)',
            borderColor: '#1DB954',
            borderWidth: 2,
            pointBackgroundColor: '#1DB954',
            pointBorderColor: '#1DB954',
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff'
            }
          }
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255,255,255,0.08)'
            },
            grid: {
              color: 'rgba(255,255,255,0.05)'
            },
            pointLabels: {
              color: '#b3b3b3',
              font: {
                size: 11
              }
            },
            ticks: {
              backdropColor: 'transparent',
              color: '#666',
              stepSize: 0.2
            },
            suggestedMin: 0,
            suggestedMax: 1
          }
        }
      }
    });
  }
}
