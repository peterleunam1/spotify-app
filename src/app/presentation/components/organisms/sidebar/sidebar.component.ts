import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarItemComponent } from '../../molecules/sidebar-item/sidebar-item.component';
import { CommonModule } from '@angular/common';
import { PRIVATE_ROUTES } from '../../../constants/routes-storage.constant';

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
    { label: 'Search', icon: 'fa-search', route: '/search' },
    { label: 'Music DNA', icon: 'fa-dna', route: '/music-dna' },
    { label: 'Library', icon: 'fa-book', route: '/library' }
  ];
  isActive(route: string): boolean {
    return this.router.url === route;
  }
  goToHome() {
    this.router.navigate([PRIVATE_ROUTES.DASHBOARD]);
  }
}
