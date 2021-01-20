import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DsIconCategory } from 'design-system';

import { IconsPageItem } from '../../entities/icons-page-item';

@Component({
  selector: 'app-icons-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icons-page.component.html',
})
export class IconsPageComponent {
  @Input() items: ReadonlyMap<DsIconCategory, IconsPageItem[]> = new Map();

  trackByFn(_index: number, item: IconsPageItem): string {
    return `${item.category}${item.name}`;
  }
}
