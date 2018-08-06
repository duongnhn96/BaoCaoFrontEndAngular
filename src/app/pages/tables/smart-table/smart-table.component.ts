import { Notify } from './../../../@core/data/config';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { UsersService } from './../../../user.service';
import { ListmailService } from './../../../listmail.service';
import { IListMail } from './../../../@core/data/listmail';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'ngx-smart-table',
  
  templateUrl: './smart-table.component.html',
  styles: ['./smart-table.component.scss'],
  
})


export class SmartTableComponent implements OnInit {
  username:any;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      Subject: {
        title: 'Subject',
        type: 'string',
      },
      
      Name: {
        title: 'Name',
        type: 'string',
      },
      Messages: {
        title: 'Messages',
        type: 'string',
      },
     
    },
  };
  emails: IListMail[];


  config = new ToasterConfig({
    positionClass: Notify.position,
    timeout: Notify.timeout,
    newestOnTop: Notify.isNewestOnTop,
    tapToDismiss: Notify.isHideOnClick,
    preventDuplicates: Notify.isDuplicatesPrevented,
    animation: Notify.animationType,
    limit: Notify.toastsLimit,
  });
  public showToast(type: string, title: string, body: string) {
      
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
  constructor(private service: ListmailService,private UsersService: UsersService,private toasterService: ToasterService) {

   }
   
   
   
   
  ngOnInit(){
    this.username = this.UsersService.getUserInfo();
    
    this.service.getData(this.username.username).subscribe(value => {this.emails=value});
  }
  deleteEmail(id:number): void{
    
    this.service.deleteEmail(id)
    .subscribe(() => {
      this.emails = this.emails.filter(filterID => filterID.id !== id); // update when delete
      this.showToast(Notify.sussces, Notify.Done, Notify.emailDeleted);
    },
    (err: HttpErrorResponse) => {

      this.showToast("error", "EROR!", err.error);
    });
  }
}
