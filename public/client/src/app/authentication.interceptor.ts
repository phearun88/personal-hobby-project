import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authenticationService.token;
    
    if (token) {
      return next.handle(request);
    }
    return next.handle(request);
  }

  

  addAuthenticationHeader(request: HttpRequest<unknown>) {
    const modifiedRequest = request.clone({
     setHeaders: {
       'Authorization': 'Bearer' + this.authenticationService.token
     }
   });

   return modifiedRequest;
 }

}