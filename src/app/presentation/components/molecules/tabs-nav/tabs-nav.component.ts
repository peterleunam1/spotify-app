import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabButtonComponent } from '../../atoms/tab-button/tab-button.component';

export type LibraryTab = 'artists' | 'tracks' | 'playlists' | 'liked';

@Component({
  selector: 'app-tabs-nav',
  imports: [CommonModule, TabButtonComponent],
  templateUrl: './tabs-nav.component.html'
})
export class TabsNavComponent {
  @Input() activeTab!: LibraryTab;
  @Output() tabChange = new EventEmitter<LibraryTab>();

  tabs = [
    { key: 'artists', label: 'Artists' },
    { key: 'tracks', label: 'Tracks' },
    { key: 'playlists', label: 'Playlists' },
    { key: 'liked', label: 'Liked Songs' }
  ] as const;

  selectTab(tab: LibraryTab) {
    this.tabChange.emit(tab);
  }
}
