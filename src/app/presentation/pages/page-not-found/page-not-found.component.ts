import { Component, inject } from '@angular/core';
import { MainButtonComponent } from '../../components/atoms/main-button/main-button.component';
import { Router } from '@angular/router';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../constants/routes-storage.constant';

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
