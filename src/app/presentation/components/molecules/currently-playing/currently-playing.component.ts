import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentlyPlayingModel } from '../../../../domain/player/player.entity';

@Component({
  selector: 'app-currently-playing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currently-playing.component.html',
  styleUrls: ['./currently-playing.component.css']
})
export class CurrentlyPlayingComponent implements OnInit, OnDestroy {

  @Input({ required: true })
  track!: () => CurrentlyPlayingModel | null;

  @Input({ required: true })
  refresh!: () => Promise<void>;

  progress = signal<number>(0);
  progressMs = signal<number>(0);

  private refreshInterval: ReturnType<typeof setInterval> | null = null;
  private progressInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {

    this.syncProgress();
    this.startAutoRefresh();
    this.startProgressAnimation();
  }

  ngOnDestroy(): void {

    if (this.refreshInterval) clearInterval(this.refreshInterval);
    if (this.progressInterval) clearInterval(this.progressInterval);
  }

  private startAutoRefresh(): void {

    this.refreshInterval = setInterval(async () => {

      await this.refresh();
      this.syncProgress();

    }, 5000);
  }

  private startProgressAnimation(): void {

    this.progressInterval = setInterval(() => {

      const t = this.track();

      if (!t || !t.isPlaying) return;

      this.progressMs.update(v => v + 1000);

      const percent = (this.progressMs() / t.durationMs) * 100;

      this.progress.set(percent);

    }, 1000);
  }

  private syncProgress(): void {

    const t = this.track();

    if (!t) return;

    this.progressMs.set(t.progressMs);

    const percent = (t.progressMs / t.durationMs) * 100;

    this.progress.set(percent);
  }

  formatDuration(ms: number): string {

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}