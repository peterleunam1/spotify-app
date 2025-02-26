import { Component, inject } from '@angular/core';
import { TokenUseCase } from '../../../application/token/token.use-case';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';

@Component({
  selector: 'app-callback',
  imports: [LoaderComponent],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent {
  private tokeUseCase = inject(TokenUseCase);

  ngOnInit() {
    this.tokeUseCase.saveToken();
  }
}
