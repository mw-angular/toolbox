import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MainMenuItem } from '../../entities/main-menu-item';

@Component({
  selector: 'app-main-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-menu-item.component.html',
})
export class MainMenuItemComponent {
  @Input() item: MainMenuItem | null = null;
  @Input() isActive: boolean = false;
}
