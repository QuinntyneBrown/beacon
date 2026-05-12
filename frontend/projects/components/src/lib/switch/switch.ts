import { Component, input, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-switch',
  imports: [MatSlideToggleModule],
  templateUrl: './switch.html',
  styleUrl: './switch.scss'
})
export class SwitchComponent {
  readonly checked = input(false);
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly checkedChanged = output<boolean>();
}
