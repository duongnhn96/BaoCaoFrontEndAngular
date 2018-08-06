import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
export const TOKEN_NAME: string = 'jwt_token';
@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private router:Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if (this.isTokenExpired(Cookie.get('userToken'))) {
      this.router.navigate(['/login']);
      return false; 
    }
    if(Cookie.get('userToken')!=null)
      return true; // cho phep vao
    
    this.router.navigate(['/login']);
    return false; 
    
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  getToken(): string {
    return Cookie.get(TOKEN_NAME);
  }
}
