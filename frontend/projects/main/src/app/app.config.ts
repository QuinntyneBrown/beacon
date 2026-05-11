import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { API_CONFIGURATION, AUTH_SERVICE, AuthService, BOARD_SERVICE, BoardService, PROFILE_SERVICE, ProfileService } from 'api';
import { KANBAN_BOARD_STATE_SERVICE, KanbanBoardStateService, SESSION_SERVICE, SessionService } from 'domain';
import { appEnvironment } from './app-environment';
import { authInterceptor } from './auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: API_CONFIGURATION, useValue: appEnvironment },
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: BOARD_SERVICE, useClass: BoardService },
    { provide: PROFILE_SERVICE, useClass: ProfileService },
    { provide: SESSION_SERVICE, useClass: SessionService },
    { provide: KANBAN_BOARD_STATE_SERVICE, useClass: KanbanBoardStateService }
  ]
};
