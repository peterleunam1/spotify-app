import { inject, Injectable } from '@angular/core';
import { SingerGateway } from '../../domain/singers/singer.gateway';
import { TokenGateway } from '../../domain/token/token.gateway';

@Injectable({
  providedIn: 'root'
})
export class SingerUseCase {
  private singerGateway = inject(SingerGateway);
  private tokenGateway = inject(TokenGateway);

  getAnArtist(name: string) {
    const token = this.tokenGateway.getToken();
    return this.singerGateway.getAnArtist(name, token);
  }
}
