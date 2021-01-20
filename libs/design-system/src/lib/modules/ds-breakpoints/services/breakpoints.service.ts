import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Breakpoints } from '../entities/breakpoints';

@Injectable()
export class BreakpointsService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  matches(breakpoint: Breakpoints): Observable<boolean> {
    return this.breakpointObserver.observe([breakpoint]).pipe(map(({ matches }: BreakpointState): boolean => matches));
  }
}
