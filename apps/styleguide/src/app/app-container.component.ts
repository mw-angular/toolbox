import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout-container>
      <router-outlet></router-outlet>
    </app-layout-container>
  `,
})
export class AppContainerComponent {}
