import { Component, inject } from '@angular/core';
import { TokenUseCase } from '../../../application/token/token.use-case';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  private tokeUseCase = inject(TokenUseCase);

  ngOnInit() {
    this.tokeUseCase.saveToken();
  }
}
