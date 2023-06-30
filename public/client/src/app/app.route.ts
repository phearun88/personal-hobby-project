import { environment } from "src/environments/environment.development";
import { AddcountryComponent } from "./addcountry/addcountry.component";
import { AddfoodComponent } from "./addfood/addfood.component";
import { EditcountryComponent } from "./editcountry/editcountry.component";
import { EditfoodComponent } from "./editfood/editfood.component";
import { FoodComponent } from "./food/food.component";
import { FoodsComponent } from "./foods/foods.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { SearchComponent } from "./search/search.component";
import { ErrorpageComponent } from "./errorpage/errorpage.component";

export const AppRoute = [
    {
        path: "",
        component: HomeComponent
      },
      {
        path: environment.PATH_GET_ALL_FOODS,
        component: FoodsComponent
      },
      {
        path: environment.PATH_GET_ONE_FOOD,
        component: FoodComponent
      },
      {
        path: environment.PATH_EDIT_ONE_FOOD,
        component: EditfoodComponent
      },
      {
        path: environment.PATH_ADD_ONE_FOOD,
        component: AddfoodComponent
      },
      {
        path: environment.PATH_ADD_ONE_COUNTRY,
        component: AddcountryComponent
      },
      {
        path: environment.PATH_EDIT_ONE_COUNTRY,
        component: EditcountryComponent
      },
      {
        path: environment.PATH_REGISTER,
        component: RegisterComponent
      },
      {
        path: environment.PATH_SEARCH,
        component: SearchComponent
      },
      {
        path: environment.PATH_ERROR,
        component: ErrorpageComponent
      }
];