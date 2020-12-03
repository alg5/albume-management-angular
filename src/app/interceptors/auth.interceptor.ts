import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { paths } from '../classes/enums';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";
  private token = "secrettoken";
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (!req.url.includes(paths.auth)) {
    //   return next.handle(req);
    // }

  if (!req.headers.has(this.AUTH_HEADER)) {
    req = this.addAuthenticationToken(req);
    console.warn("AuthInterceptor");
    return next.handle(req);
  }
    
    // console.warn("AuthInterceptor");
    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }
    // req = this.addAuthenticationToken(req);














  }



  private refreshAccessToken(): Observable<any> {
    return of("secret token");
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.

    if (!this.token) {
      
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    // if (!request.url.match(/www.mydomain.com\//)) {
    if (!request.url.match(environment.apiUrl)) { 
      console.log("(!request.url.match")   ;  
      return request;
    }
    console.warn("AuthInterceptor:request.headers.set(this.AUTH_HEADER",this.AUTH_HEADER, "Bearer " + this.token);
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }

}
