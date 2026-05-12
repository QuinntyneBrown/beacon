import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthShellComponent } from 'components';
import { AuthHeroPanelComponent, SignInFormComponent } from 'domain';

@Component({
  selector: 'app-sign-in-page',
  imports: [AuthHeroPanelComponent, AuthShellComponent, SignInFormComponent],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.scss'
})
export class SignInPageComponent {
  private readonly router = inject(Router);

  onAuthenticated(): void {
    this.router.navigateByUrl('/boards');
  }
}
