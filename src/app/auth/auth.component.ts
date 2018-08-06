import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
// import { NbMenuService } from '@nebular/theme';

// @Component({
//   selector: 'auth',
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.scss']
// })
// export class AuthComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';



@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html',
})
export class AuthComponent  {

  constructor(private menuService: NbMenuService) {
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}