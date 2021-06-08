import { MwLetDirective } from './mw-let.directive';

export class MwLetContext<T> {
  constructor(private readonly internalDirectiveInstance: MwLetDirective<T>) {}

  get $implicit(): T {
    return this.internalDirectiveInstance.mwLet;
  }

  get mwLet(): T {
    return this.internalDirectiveInstance.mwLet;
  }
}
