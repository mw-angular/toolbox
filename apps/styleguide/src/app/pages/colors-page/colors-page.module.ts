import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ColorsPageContainerComponent } from './colors-page-container.component';
import { colorsPageRoutes } from './colors-page.routes';
import { ColorsPageComponent } from './components/colors-page/colors-page.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(colorsPageRoutes)],
  declarations: [ColorsPageContainerComponent, ColorsPageComponent],
})
export class ColorsPageModule {}
