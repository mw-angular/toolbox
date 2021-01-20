import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleService } from '../../services/title.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-colors-page></app-colors-page> `,
})
export class ColorsPageContainerComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Colors');
  }
}
