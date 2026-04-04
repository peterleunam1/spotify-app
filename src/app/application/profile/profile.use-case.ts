import { inject, Injectable } from '@angular/core';
import { ProfileGateWay } from '../../domain/profile/profile.gateway';
import { GetTopItemsParams } from '../../domain/profile/profile.entity';
import { BaseUseCase } from '../base/base.use-case';

@Injectable({
  providedIn: 'root'
})
export class ProfileUseCase extends BaseUseCase {
  private gateway = inject(ProfileGateWay);
  getProfile() {
    return this.gateway.getProfile();
  }
  getTopItems(params: GetTopItemsParams) {
    return this.execute(this.gateway.getTopItems(params));
  }
}
