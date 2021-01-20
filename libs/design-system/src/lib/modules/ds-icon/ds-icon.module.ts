import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DsIconComponent } from './components/ds-icon/ds-icon.component';

@NgModule({
  imports: [HttpClientModule],
  declarations: [DsIconComponent],
  exports: [DsIconComponent],
})
export class DsIconModule {}
