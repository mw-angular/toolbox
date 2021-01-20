import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MainMenuItem } from '../../entities/main-menu-item';

@Component({
  selector: 'app-main-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {
  @Input() items: MainMenuItem[] = [];

  trackByFn(_index: number, item: MainMenuItem): string {
    return item.url;
  }
}
