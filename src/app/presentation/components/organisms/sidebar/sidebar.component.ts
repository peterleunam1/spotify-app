import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  imports: [SidebarItemComponent, CommonModule, RouterModule]
})
export class SidebarComponent {
  private router = inject(Router);
  sidebarItems: SidebarItem[] = [
    { label: 'Home', icon: 'fa-home', route: '/dashboard' },
    { label: 'Search', icon: 'fa-search', route: '/search' }
  ];
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
