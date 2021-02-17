import { BehaviorSubject } from 'rxjs';

export interface MwLoadingPool {
  [tag: string]: BehaviorSubject<number>;
}
