import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback/auth-callback';
import { HomePageComponent } from './home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: '**', redirectTo: '' }
];
