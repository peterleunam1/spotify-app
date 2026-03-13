import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DominantColorState {
 dominantColor = signal('rgb(30,30,30)');

  setDominantColor(color: string) {
    this.dominantColor.set(color);
  }
}
