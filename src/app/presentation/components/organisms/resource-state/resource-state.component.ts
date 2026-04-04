import { Component, Input } from '@angular/core';
import { LoadState } from '../../../../shared/state/resource-state.model';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../atoms/skeleton/skeleton.component';

interface SkeletonProps {
  type: 'card' | 'circle' | 'text' | 'song' | 'big-circle' | 'hero' | 'stats' | 'dna';
  count: number;
}

@Component({
  selector: 'app-resource-state',
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './resource-state.component.html'
})
export class ResourceStateComponent {
  @Input() state!: LoadState;
  @Input() error: string | null = null;
  @Input() emptyMessage: string | null = null;
  @Input() skeletonProps: SkeletonProps = { type: 'card', count: 10 };
}
