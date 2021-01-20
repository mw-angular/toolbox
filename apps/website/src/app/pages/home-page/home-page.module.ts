import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePageContainerComponent } from './home-page-container.component';
import { homePageRoutes } from './home-page.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homePageRoutes)],
  declarations: [HomePageContainerComponent],
})
export class HomePageModule {}
