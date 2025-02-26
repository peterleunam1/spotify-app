import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItemComponent } from '../../molecules/sidebar-item/sidebar-item.component';
import { CommonModule } from '@angular/common';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [SidebarItemComponent, CommonModule]
})
export class SidebarComponent {
  private router = inject(Router);
  sidebarItems: SidebarItem[] = [
    { label: 'Home', icon: 'fa-home', route: '/dashboard' },
    { label: 'Search', icon: 'fa-search', route: '/search' },
    { label: 'Your Library', icon: 'fa-book', route: '/library' },
    { label: 'Create Playlist', icon: 'fa-plus-square', route: '/create-playlist' },
    { label: 'Liked Songs', icon: 'fa-heart', route: '/liked-songs' }
  ];
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
