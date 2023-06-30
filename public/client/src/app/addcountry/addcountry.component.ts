import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Country } from '../foods/foods.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryDataService } from '../country-data.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-addcountry',
  templateUrl: './addcountry.component.html',
  styleUrls: ['./addcountry.component.css']
})
export class AddcountryComponent {

  @ViewChild(environment.ADD_COUNTRY_FORM)
  addCountryForm!: NgForm;

  name!: string;
  zipcode!: string;

  constructor(private route: ActivatedRoute, private country_servic: CountryDataService, private _router: Router) { }
  foodId = this.route.snapshot.params[environment.FOOD_ID]

  addCountry() {

    const result: boolean = window.confirm(environment.MESSAGE_CONFIRM_SAVE);
    if (result) {
      this.addCountryForm.value.foodId = this.foodId;
      this.country_servic.addOne(this.addCountryForm.value).subscribe(foods => {
        this._router.navigate([environment.FOODS_ENDPOINT + this.foodId]);
      })
    }



  }

}