import { inject, Injectable } from '@angular/core';
import { SingerGateway } from '../../domain/singers/singer.gateway';
import { catchError } from 'rxjs';
import { SingerError } from '../../domain/singers/singer.error';

@Injectable({
  providedIn: 'root'
})
export class SingerUseCase {
  private singerGateway = inject(SingerGateway);

  getAnArtist(name: string) {
    return this.singerGateway.getAnArtist(name).pipe(
      catchError(error => {
        throw new SingerError(
          'A technical error occurred, please try again later',
          error.status
        );
      })
    );
  }
}
