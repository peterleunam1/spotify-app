import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PRIVATE_ROUTES } from '../../constants/routes-storage.constant';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {
  private router = inject(Router);
  goToHome() {
    this.router.navigate([PRIVATE_ROUTES.DASHBOARD]);
  }
}
