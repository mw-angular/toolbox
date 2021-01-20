import { animate, animateChild, query, sequence, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './layout.component.html',
  animations: [
    trigger('remove', [
      state(
        'true',
        style({
          transform: 'translateX(-120%)',
        }),
      ),
      state(
        'false',
        style({
          transform: 'translateX(0px)',
        }),
      ),
      transition('true <=> false', [sequence([query(':self', [animate(0)]), query('@*', animateChild())])]),
    ]),
    trigger('showHideOverlay', [
      state(
        'show',
        style({
          opacity: 1,
        }),
      ),
      state(
        'hide',
        style({
          opacity: 0,
        }),
      ),
      transition('show <=> hide', [animate('300ms linear')]),
    ]),
    trigger('openCloseSidebar', [
      state(
        'open',
        style({
          transform: 'translateX(0px)',
        }),
      ),
      state(
        'close',
        style({
          transform: 'translateX(-120%)',
        }),
      ),
      transition('open <=> close', [animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')]),
    ]),
  ],
})
export class LayoutComponent {
  @Input() title: string | null = null;

  isOpenedSidebar$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  openSidebar(): void {
    this.isOpenedSidebar$$.next(true);
  }

  closeSidebar(): void {
    this.isOpenedSidebar$$.next(false);
  }
}
