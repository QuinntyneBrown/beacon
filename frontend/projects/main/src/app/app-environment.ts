import { ApiConfiguration } from 'api';

export const appEnvironment: ApiConfiguration = {
  baseUrl: 'http://127.0.0.1:5078',
  authMode: 'local',
  oidc: {
    clientId: 'beacon-web',
    authorizationEndpoint: 'https://example.com/connect/authorize',
    tokenEndpoint: 'https://example.com/connect/token',
    redirectUri: 'http://127.0.0.1:4200/auth/callback',
    scope: 'openid profile email offline_access'
  }
};
