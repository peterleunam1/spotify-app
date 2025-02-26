import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PRIVATE_ROUTES } from '../../constants/routes-storage.constant';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  private router = inject(Router);  
  goToHome() {
    this.router.navigate([PRIVATE_ROUTES.DASHBOARD]);
  }
}
