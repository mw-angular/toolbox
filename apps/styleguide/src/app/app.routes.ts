/* tslint:disable */
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'icons',
    pathMatch: 'full',
  },
  {
    path: 'icons',
    loadChildren: () => import('./pages/icons-page/icons-page.module').then((m) => m.IconsPageModule),
  },
  {
    path: 'colors',
    loadChildren: () => import('./pages/colors-page/colors-page.module').then((m) => m.ColorsPageModule),
  },
  {
    path: '**',
    redirectTo: 'icons',
  },
];
