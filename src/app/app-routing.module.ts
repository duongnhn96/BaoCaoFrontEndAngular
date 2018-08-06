import { LoginComponent } from './auth/login/login.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthRoleGuard } from './auth-role/auth-role.guard';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule',canActivate:[AuthRoleGuard] },

  {
    path: 'login',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      }
    ]
  },
  {
    path: 'register',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: RegisterComponent,
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default
  { path: '**', redirectTo: 'login' },

  
];

const config: ExtraOptions = {
  useHash: true, // hash # in url
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
