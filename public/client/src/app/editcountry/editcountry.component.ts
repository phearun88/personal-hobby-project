import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountryDataService } from '../country-data.service';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../foods/foods.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-editcountry',
  templateUrl: './editcountry.component.html',
  styleUrls: ['./editcountry.component.css']
})
export class EditcountryComponent implements OnInit {

  country!: Country;
  countryUpdateFormGroup!: FormGroup;
  foodId = this.route.snapshot.params[environment.FOOD_ID]
  countryId = this.route.snapshot.params[environment.COUNTRY_ID]
  successMessage: string = "";
  errMessage: string = "";
  isSuccess: boolean = false;
  isError: boolean = false;


  constructor(private countryService: CountryDataService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.initForm()
    if (this.foodId != undefined && this.countryId != undefined) {
      this.countryService.getOne(this.foodId, this.countryId).subscribe(country => {
        this.country = country;
        this.foodId;
        this.setValtoform(country);
      })
    }
  }

  initForm() {
    this.countryUpdateFormGroup = new FormGroup({
      name: new FormControl(),
      zipcode: new FormControl()
    })
  }

  btnCloseAlert() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_NONE;
    }
  }


  update(form: FormGroup) {
    const result: boolean = window.confirm(environment.MESSAGE_CONFIRM_UPDATE);
    if (result) {
      this.countryService.upateOne(this.foodId, this.countryId, form.value).subscribe({
        next: (user) => this.success(),
        error: (error) => this.fail()
      });
    }
  }
  success() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_BLOCK;
    }
    this.successMessage = environment.MESSAGE_UPDATE_SUCCUESS;
    this.errMessage = "";
    this.isSuccess = true;
    this.isError = false;
  }

  fail() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_BLOCK;
    }
    this.successMessage = "";
    this.errMessage = environment.MESSAGE_UPDATE_FAIL;
    this.isSuccess = false;
    this.isError = true;
  }

  setValtoform(country: Country) {
    this.countryUpdateFormGroup = new FormGroup({
      name: new FormControl(this.country.name),
      zipcode: new FormControl(this.country.zipcode)
    })

  }


}
