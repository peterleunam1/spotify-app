import { Component, inject, OnInit } from '@angular/core';
import { TokenUseCase } from '../../../application/token/token.use-case';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  imports: [LoaderComponent]
})
export class CallbackComponent implements OnInit {
  private tokeUseCase = inject(TokenUseCase);

  ngOnInit() {
    this.tokeUseCase.saveToken();
  }
}
