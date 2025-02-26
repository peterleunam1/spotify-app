import { inject, Injectable } from '@angular/core';
import { TokenGateway } from '../../domain/token/token.gateway';
import { ProfileGateWay } from '../../domain/profile/profile.gateway';

@Injectable({
  providedIn: 'root'
})
export class ProfileUseCase {
private profileGateWay = inject(ProfileGateWay);
  private tokenGateWay = inject(TokenGateway);
  getProfile() {
    const token = this.tokenGateWay.getToken();
    return this.profileGateWay.getProfile(token);
  }
}
