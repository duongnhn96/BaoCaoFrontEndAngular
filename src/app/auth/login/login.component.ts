import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from './../../user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import {Cookie} from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  isLoginError: boolean = false;
  Users: Observable<any>;
  constructor(private userService: UsersService, private router: Router) { }
  checkLogin(username: string, password: string) {
    this.blockUI.start('Loading...');
    this.userService.userAuthentication(username, password).subscribe((data: any) => {
      if(data==null){
        this.isLoginError = true;
      }
 //     localStorage.setItem('userToken', data);
      Cookie.set("userToken", data);
      this.blockUI.stop();
      this.router.navigate(['/pages']);
    }, () => {
      this.blockUI.stop();
      this.isLoginError = true;
    }
    );
  }
 
  

  ngOnInit() {
  }

}
