import { inject, Injectable } from '@angular/core';
import { SingerGateway } from '../../domain/singers/singer.gateway';
import { TokenGateway } from '../../domain/token/token.gateway';
import { catchError } from 'rxjs';
import { SingerError } from '../../domain/singers/singer.error';

@Injectable({
  providedIn: 'root'
})
export class SingerUseCase {
  private singerGateway = inject(SingerGateway);
  private tokenGateway = inject(TokenGateway);

  getAnArtist(name: string) {
    const token = this.tokenGateway.getToken();
    return this.singerGateway.getAnArtist(name, token).pipe(
      catchError(error => {
        throw new SingerError(
          'A technical error occurred, please try again later',
          error.status
        );
      })
    );
  }
}
