import { Component } from '@angular/core';
import { SignInContentComponent } from '../../components/organisms/sign-in-content/sign-in-content.component';

@Component({
  selector: 'app-sign-in',
  imports: [SignInContentComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {}
