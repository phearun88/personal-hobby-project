import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from './foods/foods.component';
import { environment } from 'src/environments/environment.development';
// import { Food } from './foods/foods.component';

@Injectable({
  providedIn: 'root'
})
export class FoodsDataService {

  offset = parseInt(environment.OFFSET);
  count = parseInt(environment.COUNT)

  constructor(private http: HttpClient) { }
  base_Url: string = environment.BASE_URL;


  public getFoods(offset: number, count: number): Observable<Food[]> {
    
    const queryParams = environment.QUERY_PARAMS_OFFSET + offset + environment.QUERY_PARAMS_COUNT + count;

    const url: string = this.base_Url + queryParams;

    return this.http.get<Food[]>(url);
  }

  public findFoods(offset: number, count: number, search: string): Observable<Food[]> {
    const queryParams = environment.QUERY_PARAMS_OFFSET + offset + environment.QUERY_PARAMS_COUNT + count + environment.QUERY_PARAMS_SEARCH + search;
    const url: string = this.base_Url + queryParams;
    return this.http.get<Food[]>(url);
  }

  public getFood(foodId: string): Observable<Food> {
    const url: string = this.base_Url + "/" + foodId;
    return this.http.get<Food>(url);
  }

  public deleteFood(foodId: string): Observable<Food> {
    const url: string = this.base_Url + "/" + foodId;
    return this.http.delete<Food>(url);
  }

  

  public addFood(data: any): Observable<any> {

    const url: string = this.base_Url;
    return this.http.post<any>(url, data)
  }

  public upateFood(foodId: string, datas: any): Observable<any> {

    const url: string = this.base_Url + "/" + foodId;
    return this.http.put<any>(url, datas)
  }



}
