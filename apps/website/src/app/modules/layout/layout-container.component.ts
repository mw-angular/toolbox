import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-layout-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout>
      <ng-content></ng-content>
    </app-layout>
  `,
})
export class LayoutContainerComponent {}
