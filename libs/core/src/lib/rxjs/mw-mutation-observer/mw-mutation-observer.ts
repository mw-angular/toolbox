import { defer, Observable, Subscriber, TeardownLogic } from 'rxjs';

export function mwMutationObserver(target: Node, options: MutationObserverInit): Observable<MutationRecord[]> {
  return defer(
    (): Observable<MutationRecord[]> => {
      return new Observable<MutationRecord[]>(
        (subscriber: Subscriber<MutationRecord[]>): TeardownLogic => {
          const callback: MutationCallback = (mutations: MutationRecord[]): void => {
            subscriber.next(mutations);
          };

          const mutationObserver: MutationObserver = new MutationObserver(callback);

          mutationObserver.observe(target, options);

          return (): void => {
            mutationObserver.disconnect();
          };
        },
      );
    },
  );
}
