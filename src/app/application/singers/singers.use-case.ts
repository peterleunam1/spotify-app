import { inject, Injectable } from '@angular/core';
import { BaseUseCase } from '../base/base.use-case';
import { SearchGateway } from '../../domain/search/search.gateway';

@Injectable({
  providedIn: 'root'
})
export class SingerUseCase extends BaseUseCase{
  private singerGateway = inject(SearchGateway);

  getAnArtist(name: string) {
    return this.execute(this.singerGateway.getAnArtist(name));
  }
}
