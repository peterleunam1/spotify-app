import { inject, Injectable } from '@angular/core';
import { ProfileGateWay } from '../../domain/profile/profile.gateway';
import { GetTopItemsParams } from '../../domain/profile/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class ProfileUseCase {
  private profileGateWay = inject(ProfileGateWay);
  getProfile() {
    return this.profileGateWay.getProfile();
  }
  getTopItems(props: GetTopItemsParams) {
    return this.profileGateWay.getTopItems(props);
  }
}
