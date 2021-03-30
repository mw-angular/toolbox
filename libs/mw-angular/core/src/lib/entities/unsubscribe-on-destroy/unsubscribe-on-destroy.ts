import { OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class UnsubscribeOnDestroy implements OnDestroy {
  private destroy$$: Subject<void> = new Subject<void>();

  protected destroy$: Observable<void> = this.destroy$$.asObservable();

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
