import { Observable } from 'rxjs';
import { ProfileModel } from './profile.entity';

export abstract class ProfileGateWay {
    abstract getProfile(token: string): Observable<ProfileModel>;
}
