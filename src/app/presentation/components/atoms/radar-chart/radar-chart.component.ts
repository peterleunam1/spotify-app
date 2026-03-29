import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import Chart from 'chart.js/auto';

export interface RadarChartData {
  labels: string[];
  values: number[];
  title?: string;
}

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html'
})
export class RadarChartComponent implements AfterViewInit, OnChanges {

  @Input({ required: true })
  data!: RadarChartData;

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart?: Chart;
  viewReady = false;

  ngAfterViewInit() {
    this.viewReady = true;
    this.tryCreateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.tryCreateChart();
    }
  }

  private tryCreateChart() {
    if (!this.viewReady || !this.data) return;

    if (this.chart) {
      this.chart.destroy();
    }

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
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#1ed760'
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        animation: {
          duration: 1400,
          easing: 'easeOutQuart'
        },

        elements: {
          line: {
            tension: 0.35
          }
        },

        plugins: {
          legend: {
            display: false
          }
        },

        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 1,

            grid: {
              circular: true,
              color: 'rgba(255,255,255,0.06)'
            },

            angleLines: {
  display: false
},

     pointLabels: {
  color: '#9ca3af',
  font: {
    size: 12,
    weight: 'bold'
  }
},

            ticks: {
              display: false,
              stepSize: 0.25
            }
          }
        }
      },

    plugins: [
  {
    id: 'lineGlow',
    beforeDatasetDraw(chart, args) {
      const { ctx } = chart;

      if (args.index !== 0) return;

      ctx.save();
      ctx.shadowColor = '#1DB954';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetDraw(chart, args) {
      const { ctx } = chart;

      if (args.index !== 0) return;

      ctx.restore();
    }
  }
]
    });
  }
}