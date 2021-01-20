import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './components/layout/layout.component';
import { LayoutContainerComponent } from './layout-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LayoutComponent, LayoutContainerComponent],
  exports: [LayoutContainerComponent],
})
export class LayoutModule {}
