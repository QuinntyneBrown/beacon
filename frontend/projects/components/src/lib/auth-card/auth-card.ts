import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export type AuthCardDensity = 'default' | 'compact';

@Component({
  selector: 'lib-auth-card',
  imports: [MatCardModule],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.scss'
})
export class AuthCardComponent {
  readonly density = input<AuthCardDensity>('default');
}
