import { Component, inject } from '@angular/core';
import { AuthUseCase } from '../../../application/auth/auth.use-case';
import { CommonModule } from '@angular/common';
import { MainButtonComponent } from '../../components/atoms/main-button/main-button.component';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, MainButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private authUseCase = inject(AuthUseCase);
  isLoading = false;

  login() {
    return this.authUseCase.login();
  }

  onLogin() {
    this.isLoading = true;
    setTimeout(() => {
      this.login();
    }, 400);
  }
}
