import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DsIconModule } from 'design-system';

import { IconsPageComponent } from './components/icons-page/icons-page.component';
import { IconsPageContainerComponent } from './icons-page-container.component';
import { iconsPageRoutes } from './icons-page.routes';

@NgModule({
  imports: [RouterModule.forChild(iconsPageRoutes), CommonModule, DsIconModule],
  declarations: [IconsPageContainerComponent, IconsPageComponent],
})
export class IconsPageModule {}
