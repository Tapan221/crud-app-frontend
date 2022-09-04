import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //return next.handle(request);

    if(httpRequest.url.includes(`/user/login`))
    return next.handle(httpRequest);
     if(httpRequest.url.includes(`/user/register`))
    return next.handle(httpRequest);
     if(httpRequest.url.includes(`/user/resetpassword`))
    return next.handle(httpRequest); 

    //for all other scenario we are adding the Authorization header
    this.authenticationService.loadToken();
    const token =  this.authenticationService.getToken();
    const request = httpRequest.clone({setHeaders:{Authorization: `Bearer ${token}`}});

   return next.handle(request);
  }
}
