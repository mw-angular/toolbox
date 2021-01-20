import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DsIconModule } from 'design-system';

import { MainMenuModule } from '../main-menu/main-menu.module';

import { LayoutComponent } from './components/layout/layout.component';
import { LayoutContainerComponent } from './layout-container.component';

@NgModule({
  imports: [CommonModule, MainMenuModule, DsIconModule],
  declarations: [LayoutComponent, LayoutContainerComponent],
  exports: [LayoutContainerComponent],
})
export class LayoutModule {}
