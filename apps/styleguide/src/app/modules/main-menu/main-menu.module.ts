import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DsIconModule } from 'design-system';

import { MainMenuItemComponent } from './components/main-menu-item/main-menu-item.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainMenuContainerComponent } from './main-menu-container.component';

@NgModule({
  imports: [CommonModule, RouterModule, DsIconModule],
  declarations: [MainMenuContainerComponent, MainMenuComponent, MainMenuItemComponent],
  exports: [MainMenuContainerComponent],
})
export class MainMenuModule {}
