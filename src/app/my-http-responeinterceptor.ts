import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private route: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(map(event => {
            return event;
        }), catchError(err => {
            this.handleError(err);
            return Observable.throw(err);
        })
    );
    }
    handleError(err) {
        if (err instanceof HttpErrorResponse) {
            console.log(event);
            if (err.status === 401) {
                this.route.navigate(['/login']);
            }
        }
    }
}
