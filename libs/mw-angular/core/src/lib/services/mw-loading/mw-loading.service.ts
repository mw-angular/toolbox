import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MwLoadingService {
  private isLoadingSubjectsPool: { [tag: string]: BehaviorSubject<number> } = {};

  getIsLoading(tag: string): Observable<boolean> {
    this.checkAndInitIsLoadingSubject(tag);

    return this.isLoadingSubjectsPool[tag].asObservable().pipe(
      map((value: number): boolean => value > 0),
      distinctUntilChanged(),
      // tslint:disable-next-line:no-magic-numbers
      debounceTime(100),
    );
  }

  startObservable(tag: string | null): Observable<void> {
    return new Observable((subscriber: Subscriber<void>): (() => void) => {
      if (tag !== null) {
        this.start(tag);
      }

      subscriber.next();
      subscriber.complete();

      return (): void => {};
    });
  }

  start(tag: string): void {
    this.checkAndInitIsLoadingSubject(tag);

    this.isLoadingSubjectsPool[tag].next(this.isLoadingSubjectsPool[tag].value + 1);
  }

  stop(tag: string): void {
    if (!this.isLoadingSubjectsPool[tag]) {
      throw new Error(`Loading subject was not created for tag: ${tag}.`);
    }

    if (this.isLoadingSubjectsPool[tag].value > 0) {
      this.isLoadingSubjectsPool[tag].next(this.isLoadingSubjectsPool[tag].value - 1);
    }
  }

  destroy(tag: string): void {
    if (this.isLoadingSubjectsPool[tag]) {
      this.isLoadingSubjectsPool[tag].next(0);
      this.isLoadingSubjectsPool[tag].complete();
      // tslint:disable-next-line:no-dynamic-delete
      delete this.isLoadingSubjectsPool[tag];
    }
  }

  loadingWrapper<T>(observable$: Observable<T>, tag: string | null): Observable<T> {
    return this.startObservable(tag).pipe(
      switchMapTo(observable$),
      take(1),
      finalize((): void => {
        if (tag !== null) {
          this.stop(tag);
        }
      }),
    );
  }

  getPoolInfo(): { [tag: string]: number } {
    return Object.keys(this.isLoadingSubjectsPool).reduce((acc: { [tag: string]: number }, tag: string): {
      [tag: string]: number;
    } => {
      acc[tag] = this.isLoadingSubjectsPool[tag].getValue();

      return acc;
    }, {});
  }

  private checkAndInitIsLoadingSubject(tag: string): void {
    if (!this.isLoadingSubjectsPool[tag]) {
      this.isLoadingSubjectsPool[tag] = new BehaviorSubject<number>(0);
    }
  }
}
