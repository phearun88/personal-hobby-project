import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './foods/foods.component';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  constructor(private http:HttpClient) { }
  base_Url:string = environment.BASE_URL;
  country_endpoint:string= environment.COUNTRY_ENDPOINT;

  
  public addOne(data: any): Observable<any>{
    const url:string = this.base_Url+"/"+data.foodId+this.country_endpoint;
    return this.http.post<any>(url, data)
  }

  public getOne(foodId: string, countryId:string): Observable<Country>{
    const url:string = this.base_Url+"/"+foodId+this.country_endpoint+countryId;
    return this.http.get<Country>(url);
  }


  public deleteOne(foodId: string, countryId:string): Observable<Country>{
    const url:string = this.base_Url+"/"+foodId+this.country_endpoint+countryId;
    return this.http.delete<Country>(url);
  }

  public upateOne(foodId: string, countryId:string, data: any): Observable<any>{
    const url:string = this.base_Url+"/"+foodId+this.country_endpoint+ countryId;
    return this.http.put<any>(url, data)
  }




}
