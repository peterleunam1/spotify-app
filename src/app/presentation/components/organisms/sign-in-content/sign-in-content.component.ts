import { Component, inject } from '@angular/core';
import { MainButtonComponent } from '../../atoms/main-button/main-button.component';
import { AuthUseCase } from '../../../../application/auth/auth.use-case';

@Component({
  selector: 'app-sign-in-content',
  imports: [MainButtonComponent],
  templateUrl: './sign-in-content.component.html'
})
export class SignInContentComponent {
  private authUseCase = inject(AuthUseCase);

  login() {
    return this.authUseCase.login();
  }
}
