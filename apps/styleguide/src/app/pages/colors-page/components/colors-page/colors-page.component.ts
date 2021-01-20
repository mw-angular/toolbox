import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-colors-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './colors-page.component.html',
})
export class ColorsPageComponent {}
