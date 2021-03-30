import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class UnsubscribeOnDestroy implements OnDestroy {
  private destroy$$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
