import { MyHttpInterceptor } from './my-http-interceptor';
import { AuthRoleGuard } from './auth-role/auth-role.guard';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { BlockUIModule } from 'ng-block-ui';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { XssComponent } from './xss/xss.component';
@NgModule({
  declarations: [AppComponent, AuthComponent, LoginComponent, RegisterComponent, XssComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    RecaptchaModule.forRoot(),
    BlockUIModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

  ],
  bootstrap: [AppComponent],
  providers: [
    { 
      provide: APP_BASE_HREF, 
      useValue: '/' 
     
    }
    ,AuthRoleGuard
   
    
  ]
})
export class AppModule {
}
