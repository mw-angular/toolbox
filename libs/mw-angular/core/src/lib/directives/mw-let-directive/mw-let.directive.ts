import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { MwLetContext } from './mw-let-context';

@Directive({
  selector: '[mwLet]',
})
export class MwLetDirective<T> {
  @Input() mwLet!: T;

  constructor(templateRef: TemplateRef<MwLetContext<T>>, viewContainer: ViewContainerRef) {
    viewContainer.createEmbeddedView(templateRef, new MwLetContext<T>(this));
  }

  static ngTemplateContextGuard<T>(_dir: MwLetDirective<T>, _ctx: unknown): _ctx is MwLetDirective<T> {
    return true;
  }
}
