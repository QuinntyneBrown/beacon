import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { API_CONFIGURATION, AUTH_SERVICE, AuthService, BOARD_SERVICE, BOARDS_SERVICE, BoardService, BoardsService, CARDS_SERVICE, CardsService, PROFILE_SERVICE, ProfileService } from 'api';
import { BOARDS_STATE_SERVICE, BoardsStateService, KANBAN_BOARD_STATE_SERVICE, KanbanBoardStateService, SESSION_SERVICE, SessionService } from 'domain';
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
    { provide: BOARDS_SERVICE, useClass: BoardsService },
    { provide: CARDS_SERVICE, useClass: CardsService },
    { provide: PROFILE_SERVICE, useClass: ProfileService },
    { provide: SESSION_SERVICE, useClass: SessionService },
    { provide: BOARDS_STATE_SERVICE, useClass: BoardsStateService },
    { provide: KANBAN_BOARD_STATE_SERVICE, useClass: KanbanBoardStateService }
  ]
};

