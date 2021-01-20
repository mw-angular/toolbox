import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MainMenuItem } from './entities/main-menu-item';

@Component({
  selector: 'app-main-menu-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-main-menu [items]="items"></app-main-menu> `,
})
export class MainMenuContainerComponent {
  items: MainMenuItem[] = [
    {
      icon: 'folder',
      name: 'Icons',
      url: '/icons',
    },
    {
      icon: 'folder',
      name: 'Colors',
      url: '/colors',
    },
  ];
}
