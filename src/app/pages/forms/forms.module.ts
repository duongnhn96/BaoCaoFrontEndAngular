import { RecaptchaModule } from 'ng-recaptcha';

import { BlockUIModule } from 'ng-block-ui';
import { ListmailService } from './../../listmail.service';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { ToasterModule } from 'angular2-toaster';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    BlockUIModule.forRoot(),
    ToasterModule,
    RecaptchaModule.forRoot(),
    CKEditorModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ListmailService
  ],
})
export class FormsModule { }
