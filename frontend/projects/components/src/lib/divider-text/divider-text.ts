import { Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'lib-divider-text',
  imports: [MatDividerModule],
  templateUrl: './divider-text.html',
  styleUrl: './divider-text.scss'
})
export class DividerTextComponent {
  readonly label = input.required<string>();
}
