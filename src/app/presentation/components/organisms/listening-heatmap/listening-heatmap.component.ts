import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

export interface RecentlyPlayedTrackModel {
  id: string;
  name: string;
  artist: string;
  album: string;
  durationMs: number;
  playedAt: Date;
}

interface HeatmapDay {
  date: Date;
  count: number;
}

@Component({
  selector: 'app-listening-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listening-heatmap.component.html'
})
export class ListeningHeatmapComponent implements OnChanges {

  @Input() tracks: RecentlyPlayedTrackModel[] = [];

  weeks: HeatmapDay[][] = [];
  months: string[] = [];

  hoveredDay: HeatmapDay | null = null;
  tooltipX = 0;
  tooltipY = 0;

  longestStreak = 0;
  totalPlays = 0;

  // 🔥 personality
  isNightListener = false;
  isWeekendListener = false;

  ngOnChanges(): void {
    if (!this.tracks?.length) return;
    this.buildHeatmap();
  }

  // -----------------------------
  // MAIN
  // -----------------------------

  buildHeatmap() {

    const activity = this.buildEstimatedActivity(this.tracks);

    this.weeks = this.buildWeeks(activity);
    this.months = this.buildMonths(this.weeks);
    this.longestStreak = this.calculateStreak(activity);
    this.totalPlays = activity.reduce((acc, d) => acc + Math.max(d.count, 0), 0);

    this.calculatePersonality(this.tracks);

  }

  // -----------------------------
  // ESTIMATED ACTIVITY
  // -----------------------------

  buildEstimatedActivity(tracks: RecentlyPlayedTrackModel[]): HeatmapDay[] {

    const map = new Map<string, number>();

    tracks.forEach(t => {
      const d = new Date(t.playedAt);
      map.set(this.key(d), (map.get(this.key(d)) ?? 0) + 1);
    });

    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 364);

    const days: HeatmapDay[] = [];

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {

      let count = map.get(this.key(d)) ?? 0;

      if (count === 0) {

        const day = d.getDay();
        const prob = (day === 5 || day === 6) ? 0.55 : 0.2;

        if (Math.random() < prob) {
          count = Math.floor(Math.random() * 4);
        }

      }

      days.push({ date: new Date(d), count });

    }

    return days;

  }

  // -----------------------------
  // PERSONALITY
  // -----------------------------

  calculatePersonality(tracks: RecentlyPlayedTrackModel[]) {

    let night = 0;
    let weekend = 0;

    tracks.forEach(t => {

      const date = new Date(t.playedAt);

      const hour = date.getHours();
      const day = date.getDay();

      // night: 20:00 → 04:00
      if (hour >= 20 || hour <= 4) {
        night++;
      }

      // weekend: sábado/domingo
      if (day === 6 || day === 0) {
        weekend++;
      }

    });

    const total = tracks.length || 1;

    this.isNightListener = (night / total) > 0.4;
    this.isWeekendListener = (weekend / total) > 0.4;

  }

  // -----------------------------
  // WEEKS
  // -----------------------------

  buildWeeks(days: HeatmapDay[]) {

    const weeks: HeatmapDay[][] = [];
    let week: HeatmapDay[] = [];

    days.forEach(day => {

      const dow = day.date.getDay();

      if (weeks.length === 0 && week.length === 0) {
        for (let i = 0; i < dow; i++) {
          week.push({ date: new Date(0), count: -1 });
        }
      }

      week.push(day);

      if (dow === 6) {
        weeks.push(week);
        week = [];
      }

    });

    if (week.length) {
      while (week.length < 7) {
        week.push({ date: new Date(0), count: -1 });
      }
      weeks.push(week);
    }

    return weeks;

  }

  // -----------------------------
  // MONTHS
  // -----------------------------

  buildMonths(weeks: HeatmapDay[][]) {

    return weeks.map((week, i) => {

      const current = week.find(d => d.count !== -1);
      if (!current) return '';

      if (i === 0) {
        return current.date.toLocaleString('en-US', { month: 'short' });
      }

      const prev = weeks[i - 1].find(d => d.count !== -1);

      if (prev && prev.date.getMonth() !== current.date.getMonth()) {
        return current.date.toLocaleString('en-US', { month: 'short' });
      }

      return '';

    });

  }

  // -----------------------------
  // STREAK
  // -----------------------------

  calculateStreak(days: HeatmapDay[]) {

    let current = 0;
    let max = 0;

    days.forEach(d => {

      if (d.count > 0) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 0;
      }

    });

    return max;

  }

  // -----------------------------
  // TOOLTIP
  // -----------------------------

  showTooltip(day: HeatmapDay, e: MouseEvent) {

    this.hoveredDay = day;

    let x = e.clientX + 12;
    let y = e.clientY - 36;

    if (x > window.innerWidth - 160) x = window.innerWidth - 160;
    if (y < 0) y = e.clientY + 20;

    this.tooltipX = x;
    this.tooltipY = y;

  }

  hideTooltip() {
    this.hoveredDay = null;
  }

  tooltipText(day: HeatmapDay) {

    const date = day.date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    if (day.count === 0) return `${date} · No listening`;
    if (day.count === 1) return `${date} · 1 track`;

    return `${date} · ${day.count} tracks`;

  }

  // -----------------------------
  // COLOR
  // -----------------------------

  color(count: number) {

    if (count === -1) return 'bg-transparent';
    if (count === 0) return 'bg-neutral-800';
    if (count < 2) return 'bg-green-900/60';
    if (count < 4) return 'bg-green-700/70';
    if (count < 6) return 'bg-green-500/80';

    return 'bg-green-400';

  }

  key(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

}