import { Pipe, PipeTransform } from '@angular/core';

import { MwMapperFn } from './mw-mapper-fn';

@Pipe({ name: 'mwMapper' })
export class MwMapperPipe implements PipeTransform {
  transform<TValue, TResult>(value: TValue, mapperFn: MwMapperFn<TValue, TResult>, ...args: unknown[]): TResult {
    return mapperFn(value, ...args);
  }
}
