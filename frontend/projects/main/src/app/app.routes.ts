import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';
import { BoardPageComponent } from './pages/board-page/board-page';
import { BoardsPageComponent } from './pages/boards-page/boards-page';
import { CardPageComponent } from './pages/card-page/card-page';
import { SettingsPageComponent } from './pages/settings-page/settings-page';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'boards' },
  { path: 'sign-in', component: SignInPageComponent, canActivate: [unauthGuard] },
  { path: 'boards', component: BoardsPageComponent, canActivate: [authGuard] },
  { path: 'boards/:boardId', component: BoardPageComponent, canActivate: [authGuard] },
  { path: 'boards/:boardId/cards/:cardId', component: CardPageComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsPageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'boards' }
];

