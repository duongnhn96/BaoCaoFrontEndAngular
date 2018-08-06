import { AuthRoleGuard } from './../auth-role/auth-role.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,canActivate:[AuthRoleGuard],
  children: [

    {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  },  {
    path: '',
    redirectTo: 'forms/inputs',
    pathMatch: 'full',
  }, {
    path: '**',
    loadChildren: './tables/tables.module#TablesModule',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
