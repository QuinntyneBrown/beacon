import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExternalAuthProvider } from '../models/domain-ui-models';

@Component({
  selector: 'lib-external-auth-options',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './external-auth-options.html',
  styleUrl: './external-auth-options.scss'
})
export class ExternalAuthOptionsComponent {
  readonly providers = input<readonly ExternalAuthProvider[]>([]);
  readonly submittingProviderId = input<string | null>(null);
  readonly noneAvailableText = input('No external sign-in providers are configured.');
  readonly providerSelected = output<string>();

  selectProvider(provider: ExternalAuthProvider): void {
    if (provider.enabled && !this.submittingProviderId()) {
      this.providerSelected.emit(provider.id);
    }
  }
}
