import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MwMetaService {
  constructor(private titleService: Title, private metaService: Meta) {}

  setTitle(value: string): void {
    this.titleService.setTitle(value);
  }

  setDescription(value: string): void {
    this.metaService.updateTag({ name: 'description', content: value });
  }
}
