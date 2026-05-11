import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { UpdateProfileRequest } from '../models/update-profile-request';

export interface IProfileService {
  getProfile(): Observable<Profile>;
  updateProfile(request: UpdateProfileRequest): Observable<Profile>;
  deleteAccount(): Observable<void>;
}

export const PROFILE_SERVICE = new InjectionToken<IProfileService>('PROFILE_SERVICE');
