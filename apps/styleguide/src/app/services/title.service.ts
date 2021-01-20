import { Injectable } from '@angular/core';
import { MwMetaService } from '@mw-angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title$$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private metaService: MwMetaService) {}

  setTitle(value: string): void {
    this.title$$.next(value);
    this.metaService.setTitle(value);
    this.metaService.setDescription(value);
  }

  getTitle(): Observable<string> {
    return this.title$$.asObservable();
  }
}
