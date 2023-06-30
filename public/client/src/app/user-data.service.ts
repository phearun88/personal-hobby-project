import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Users } from './navigation/navigation.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }
  base_Url:string = environment.BASE_URL_USERS;

  public addOne(data: any): Observable<any>{
    const url:string = this.base_Url+environment.REGISTER_ENDPOINT;
    return this.http.post<any>(url, data)
  }


  public getLogin(users: Users): Observable<any> {
    const url:string = this.base_Url+environment.LOGIN_ENDPOINT;
    return this.http.post<any>(url, users);
  }

}
