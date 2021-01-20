import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-layout-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout [title]="title$ | async">
      <ng-content></ng-content>
    </app-layout>
  `,
})
export class LayoutContainerComponent {
  title$: Observable<string>;

  constructor(private titleService: TitleService) {
    this.title$ = this.titleService.getTitle();
  }
}
