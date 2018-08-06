import { BlockUIModule } from 'ng-block-ui';
import { BrowserModule } from '@angular/platform-browser';
import { MyHttpInterceptor } from './../my-http-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    BlockUIModule.forRoot(),
    HttpClientModule,

  ],
  
  declarations: [
    ...PAGES_COMPONENTS,
  ],
   providers: [
  
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true
    }
    
  ]
})
export class PagesModule {
}
