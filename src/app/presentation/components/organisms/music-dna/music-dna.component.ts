import { Component, Input } from '@angular/core';
import { CardComponent } from '../../atoms/card/card.component';
import { SectionHeaderComponent } from '../../atoms/section-header/section-header.component';
import {
  RadarChartComponent,
  RadarChartData
} from '../../atoms/radar-chart/radar-chart.component';
import { MusicPersonality } from '../../../../domain/tracks/tracks.entity';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../atoms/skeleton/skeleton.component';

@Component({
  selector: 'app-my-music-dna',
  imports: [CardComponent, SectionHeaderComponent, RadarChartComponent, CommonModule, SkeletonComponent],
  templateUrl: './music-dna.component.html',
  styleUrl: './music-dna.component.css'
})
export class MyMusicDnaComponent {
  @Input() data!: RadarChartData | null;
  @Input() insights: string[] = [];
  @Input() personality: MusicPersonality | null = null;
  @Input() isLoading = false;
}
