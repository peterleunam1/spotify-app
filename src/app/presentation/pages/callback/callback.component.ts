import { Component, inject, OnInit } from '@angular/core';
import { TokenUseCase } from '../../../application/token/token.use-case';
import { SkeletonComponent } from '../../components/atoms/skeleton/skeleton.component';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  imports: [SkeletonComponent]
})
export class CallbackComponent implements OnInit {
  private tokeUseCase = inject(TokenUseCase);

  ngOnInit() {
    this.tokeUseCase.saveToken();
  }
}
