import { NgModule } from '@angular/core';

import { MwLetDirective } from './mw-let.directive';

@NgModule({
  declarations: [MwLetDirective],
  exports: [MwLetDirective],
})
export class MwLetDirectiveModule {}
