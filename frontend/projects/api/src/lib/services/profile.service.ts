import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_CONFIGURATION } from '../configuration/api-configuration';
import { Profile } from '../models/profile';
import { UpdateProfileRequest } from '../models/update-profile-request';
import { IProfileService } from './profile.service.contract';

@Injectable()
export class ProfileService implements IProfileService {
  private readonly httpClient = inject(HttpClient);
  private readonly configuration = inject(API_CONFIGURATION);

  getProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${this.configuration.baseUrl}/api/profile`);
  }

  updateProfile(request: UpdateProfileRequest): Observable<Profile> {
    return this.httpClient.put<Profile>(`${this.configuration.baseUrl}/api/profile`, request);
  }

  deleteAccount(): Observable<void> {
    return this.httpClient.delete<void>(`${this.configuration.baseUrl}/api/profile`).pipe(map(() => void 0));
  }
}
