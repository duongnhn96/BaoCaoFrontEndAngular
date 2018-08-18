import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../user.service';
import { FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpErrorResponse } from '@angular/common/http';
import { IListUser } from '../../@core/data/listuser';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  @BlockUI() blockUI: NgBlockUI;
  ngOnInit() {}

  recaptcha: string
  resolved(captchaResponse: string) {
    this.recaptcha = captchaResponse;

  }
  

  errorMessages: string;
  constructor(private userService: UsersService, private router: Router) { }
  public registerUser(username: string, password: string, email: string, fullname: string){
    this.blockUI.start("Please  wait....");
    this.userService.registerUser(username, password, email, fullname, this.recaptcha).subscribe(() => {
      this.blockUI.stop();
      this.router.navigate(['/login']);
    }, (err: HttpErrorResponse) => {
      this.errorMessages = err.error;
      console.log(this.errorMessages);
      this.blockUI.stop();
      
    }
    );
  };
}


