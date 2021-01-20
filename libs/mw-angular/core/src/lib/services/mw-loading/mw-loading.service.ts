import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MwLoadingService {
  private isLoadingSubjectsPool: { [tag: string]: BehaviorSubject<number> } = {};

  getIsLoading(tag: string = 'general'): Observable<boolean> {
    this.checkAndInitIsLoadingSubject(tag);

    return this.isLoadingSubjectsPool[tag].asObservable().pipe(
      map((value: number): boolean => value > 0),
      distinctUntilChanged(),
      // tslint:disable-next-line:no-magic-numbers
      debounceTime(100),
    );
  }

  startObservable(tag: string = 'general'): Observable<void> {
    return new Observable((subscriber: Subscriber<void>): (() => void) => {
      this.start(tag);

      subscriber.next();
      subscriber.complete();

      return (): void => {};
    });
  }

  start(tag: string = 'general'): void {
    this.checkAndInitIsLoadingSubject(tag);

    this.isLoadingSubjectsPool[tag].next(this.isLoadingSubjectsPool[tag].value + 1);
  }

  stop(tag: string = 'general'): void {
    if (!this.isLoadingSubjectsPool[tag]) {
      throw new Error(`Loading subject was not created for tag: ${tag}.`);
    }

    if (this.isLoadingSubjectsPool[tag].value > 0) {
      this.isLoadingSubjectsPool[tag].next(this.isLoadingSubjectsPool[tag].value - 1);
    }
  }

  destroy(tag: string = 'general'): void {
    if (this.isLoadingSubjectsPool[tag]) {
      this.isLoadingSubjectsPool[tag].next(0);
      this.isLoadingSubjectsPool[tag].complete();
      // tslint:disable-next-line:no-dynamic-delete
      delete this.isLoadingSubjectsPool[tag];
    }
  }

  loadingWrapper<T>(observable$: Observable<T>, tag: string = 'general'): Observable<T> {
    return this.startObservable(tag).pipe(
      switchMapTo(observable$),
      take(1),
      finalize((): void => {
        this.stop(tag);
      }),
    );
  }

  private checkAndInitIsLoadingSubject(tag: string): void {
    if (!this.isLoadingSubjectsPool[tag]) {
      this.isLoadingSubjectsPool[tag] = new BehaviorSubject<number>(0);
    }
  }
}
