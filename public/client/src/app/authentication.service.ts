import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  name: string = "";
  constructor(private jwtHelper: JwtHelperService, private _router: Router) { }


  getName() {
    return this.jwtHelper.decodeToken(this.token).name as string;
  }

  get token() {
    const token = localStorage.getItem(environment.TOKEN) as string;
    return token;
  }


  setToken(token: string) {
    localStorage.setItem(environment.TOKEN, token);
  }

  logOut() {
    localStorage.clear();
    this._router.navigate(['/'])
  }

  logIn(): boolean {
    if (null !== this.token) { return true; }
    return false;
  }

}
