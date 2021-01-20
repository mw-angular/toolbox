import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

import { BreakpointsService } from './services/breakpoints.service';

@NgModule({
  imports: [LayoutModule],
  providers: [BreakpointsService],
})
export class DsBreakpointsModule {}
