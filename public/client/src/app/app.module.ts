import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FoodsComponent } from './foods/foods.component';
import { FoodComponent } from './food/food.component';
import { AddfoodComponent } from './addfood/addfood.component';
import { EditfoodComponent } from './editfood/editfood.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AddcountryComponent } from './addcountry/addcountry.component';
import { EditcountryComponent } from './editcountry/editcountry.component';
//import { AuthenticationInterceptor } from './authentication.interceptor';

import { AppRoute } from './app.route';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorpageComponent } from './errorpage/errorpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FoodsComponent,
    FoodComponent,
    AddfoodComponent,
    EditfoodComponent,
    NavigationComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    AddcountryComponent,
    EditcountryComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(AppRoute),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
