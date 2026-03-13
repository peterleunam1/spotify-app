import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { getColorSync } from 'colorthief';
import { DominantColorState } from '../../../states/dominantColor/dominant-color.service';

@Component({
  selector: 'app-spotify-hero',
  imports: [CommonModule],
  templateUrl: './spotify-hero.component.html',
  styleUrl: './spotify-hero.component.css'
})
export class SpotifyHeroComponent implements OnInit {

 @Input() img = '';
  @Input() title = '';
  @Input() description = '';
  @Input() contentType = '';

  private dominantColorService = inject(DominantColorState);

  dominantColor = 'rgb(30,30,30)';
  darkDominantColor = 'rgb(20,20,20)';
  contentColor = 'rgb(25,25,25)';

  ngOnInit() {
    if (this.img) {
      this.setDominantColor(this.img);
    }
  }

  darkenColor(rgb: string, amount = 0.1) {
    const values = rgb.match(/\d+/g);
    if (!values) return rgb;

    const [r, g, b] = values.map(Number);

    const newR = Math.floor(r * (1 - amount));
    const newG = Math.floor(g * (1 - amount));
    const newB = Math.floor(b * (1 - amount));

    return `rgb(${newR}, ${newG}, ${newB})`;
  }

  setDominantColor(imageUrl: string) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const color = getColorSync(img);

  this.dominantColor = color ? color.css() : 'rgb(30,30,30)';
  this.darkDominantColor = this.darkenColor(this.dominantColor, 0.45);
  this.contentColor = this.darkenColor(this.dominantColor, 0.65);

  this.dominantColorService.setDominantColor(this.dominantColor);
    };
  }
}
