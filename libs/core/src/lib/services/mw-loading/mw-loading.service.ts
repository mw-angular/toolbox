import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMapTo } from 'rxjs/operators';

import { MwLoadingPool } from './mw-loading-pool';

@Injectable({
  providedIn: 'root',
})
export class MwLoadingService {
  private isLoadingSubjectsPool: MwLoadingPool = {};

  getIsLoading(value: string | string[]): Observable<boolean> {
    const tags: string[] = Array.isArray(value) ? [...value] : [value];

    tags.forEach((tag: string): void => {
      this.checkAndInitIsLoadingSubject(tag);
    });

    const counters$: BehaviorSubject<number>[] = tags.map(
      (tag: string): BehaviorSubject<number> => this.isLoadingSubjectsPool[tag],
    );

    return combineLatest(counters$).pipe(
      map((counters: number[]): boolean => counters.some((counter: number): boolean => counter > 0)),
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
