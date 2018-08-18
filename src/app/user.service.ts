import { DomSanitizer } from '@angular/platform-browser';
import { Appsetting } from './@core/data/config';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { IUserLogin, IListUser, CreateUser } from './@core/data/listuser';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }
  public trustedUrl(text : string) {
    return this.sanitizer.bypassSecurityTrustUrl(text);
  }
  userAuthentication(username:string, password:string): Observable<IUserLogin[]> {
    const myheader = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Max-Age': '1728000',
      "Authorization": "Basic " + btoa(username + ":" + password)
    });

    let body: HttpParams = new HttpParams();
    return this.http.post<IUserLogin[]>(`${Appsetting.ROOT_URL}/auth/token`, body, { headers: myheader });
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  getUserInfo() {
    var token = localStorage.getItem('userToken');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  registerUser(username:string, password:string, email:string, fullname:string, recaptcha:string ): Observable<IListUser[]> {
    const myheader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    var body = CreateUser({ username, password, email, fullname, recaptcha });
    return this.http.post<IListUser[]>(`${Appsetting.ROOT_URL}/user`, body, { headers: myheader });
  }

}
