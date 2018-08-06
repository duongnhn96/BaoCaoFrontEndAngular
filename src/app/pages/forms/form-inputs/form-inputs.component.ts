import { HttpErrorResponse } from '@angular/common/http';
import { Notify } from './../../../@core/data/config';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UsersService } from './../../../user.service';
import { ListmailService } from './../../../listmail.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/src/toaster-config';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'ckeditor';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  emails: Observable<any>;
  userid: any;
  errorMessages: string;
  constructor(private listmailService: ListmailService, private UsersService: UsersService, private toasterService: ToasterService) {

  }
  ngOnInit() {

  }
  recaptcha: string
  resolved(captchaResponse: string) {
    this.recaptcha = captchaResponse;

  }

  public createMailFromService(Mailto: string, Messages: string, Subject: string): void {
    this.blockUI.start('Loading...');
    this.userid = this.UsersService.getUserInfo();
    this.listmailService.createMail(Mailto, Messages, Subject, this.userid.id,this.recaptcha)
      .subscribe(
        value => {
          this.blockUI.stop();
          this.showToast(Notify.sussces, Notify.Done, Notify.MAILSENDING);
        }, (err: HttpErrorResponse) => {
          this.blockUI.stop();
          this.showToast("error", "EROR!", err.error);
        });
      }
    config = new ToasterConfig({
      positionClass: Notify.position,
      timeout: Notify.timeout,
      newestOnTop: Notify.isNewestOnTop,
      tapToDismiss: Notify.isHideOnClick,
      preventDuplicates: Notify.isDuplicatesPrevented,
      animation: Notify.animationType,
      limit: Notify.toastsLimit,
    });
  private showToast(type: string, title: string, body: string): void {

    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: Notify.timeout,
      showCloseButton: Notify.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
