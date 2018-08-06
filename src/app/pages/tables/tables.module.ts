import { HttpClientXsrfModule } from '@angular/common/http';
import { SanitizeHtmlPipe } from './tables.component';
import { ListmailService } from './../../listmail.service';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToasterModule } from 'angular2-toaster';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    ToasterModule
  ],
  declarations: [
    ...routedComponents,SanitizeHtmlPipe
  ],
  providers: [
    ListmailService
  ],
})
export class TablesModule { }
