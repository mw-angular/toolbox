import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>HELLO HOMEPAGE!!!</h1>`,
})
export class HomePageContainerComponent {}
