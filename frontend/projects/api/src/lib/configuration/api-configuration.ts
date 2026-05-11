import { InjectionToken } from '@angular/core';

export type AuthMode = 'local' | 'oidc';

export interface OidcConfiguration {
  readonly clientId: string;
  readonly authorizationEndpoint: string;
  readonly tokenEndpoint: string;
  readonly redirectUri: string;
  readonly scope: string;
  readonly endSessionEndpoint?: string;
}

export interface ApiConfiguration {
  readonly baseUrl: string;
  readonly authMode: AuthMode;
  readonly oidc: OidcConfiguration;
}

export const API_CONFIGURATION = new InjectionToken<ApiConfiguration>('API_CONFIGURATION');
