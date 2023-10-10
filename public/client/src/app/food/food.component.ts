import { Component } from '@angular/core';
import { Country, Food } from '../foods/foods.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodsDataService } from '../foods-data.service';
import { CountryDataService } from '../country-data.service';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {

  food!: Food;
  foodId = this.route.snapshot.params[environment.FOOD_ID]

  constructor(private route: ActivatedRoute,
    private foodService: FoodsDataService, private countryService: CountryDataService, private _router: Router, private authenticationService: AuthenticationService) {
    this.food = new Food("", "", "", "");
  }

  successMessage: string = "";
  errMessage: string = "";
  isSuccess: boolean = false;
  isError: boolean = false;
  isHidden: boolean = false;

  ngOnInit(): void {
    this.getOne();
  }

  getOne() {

    this.foodService.getFood(this.foodId).subscribe(food => {
      this.food = food;
      console.log(this.food)
    })
  }

  onDelete() {
    const result: boolean = window.confirm(environment.MESSAGE_CONFIRM_DELETE);
    if (result) {
      this.foodService.deleteFood(this.foodId).subscribe(food => {
        this.food = food;
        this._router.navigate([environment.FOODS_ENDPOINT]);
      })
    }
  }

  onDeleteCountry(countryId: string) {
    const result: boolean = window.confirm(environment.MESSAGE_CONFIRM_DELETE);
    if (result) {
      this.countryService.deleteOne(this.foodId, countryId).subscribe({
        next: (food) => this.success(),
        error: (error) => this.fail()
      })
    }
  }

  onEditCountry(countryId: string) {
    this.countryService.deleteOne(this.foodId, countryId).subscribe(food => {
      this.getOne();
    })
    
  }
  isLogIn() {
    return this.authenticationService.logIn();
  }


  btnCloseAlert() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_NONE;
    }
  }

  success() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_BLOCK;
    }
    this.successMessage = environment.MESSAGE_DELETE_SUCCUESS;
    this.errMessage = "";
    this.isSuccess = true;
    this.isError = false;
    this.getOne();

  }

  fail() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_BLOCK;
    }
    this.successMessage = "";
    this.errMessage = environment.MESSAGE_DELETE_FAIL;
    this.isSuccess = false;
    this.isError = true;
  }
}
