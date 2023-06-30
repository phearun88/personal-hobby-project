import { Component, OnInit } from '@angular/core';
import { FoodsDataService } from '../foods-data.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from '../authentication.service';
export class Country {
  #_id!: string;
  #name!: string;
  #zipcode!: string;

  get _id() { return this.#_id; }
  set _id(_id: string) { this.#_id = _id; }

  get name() { return this.#name; }
  set name(name: string) { this.#name = name; }

  get zipcode() { return this.#zipcode; }
  set zipcode(zipcode: string) { this.#zipcode = zipcode; }

  constructor(_id: string, name: string, zipcode: string) {
    this.#_id = _id;
    this.#name = name;
    this.#zipcode = zipcode;
  }

}

export class Food {
  #_id!: string;
  #name!: string;
  #image!: string;
  #ingredients!: string;
  #country!: [Country];

  get _id() { return this.#_id };
  get name() { return this.#name };
  get image() { return this.#image };
  get ingredients() { return this.#ingredients };
  get country() { return this.#country };


  set _id(_id: string) { this.#_id = _id };
  set name(name: string) { this.#name = name };
  set image(image: string) { this.#image = image };
  set ingredients(ingredients: string) { this.#ingredients = ingredients };
  set country(country: [Country]) { this.#country = country };


  constructor(_id: string, name: string, image: string, ingredients: string) {
    this.#_id = _id;
    this.#name = name;
    this.#image = image;
    this.#ingredients = ingredients;
  }
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {


  foods!: Food[];
  count: number = parseInt(environment.COUNT);
  offset: number = parseInt(environment.OFFSET);
  successMessage: string = "";
  errMessage: string = "";
  isSuccess: boolean = false;
  isError: boolean = false;
  isHidden: boolean = false;

  constructor(private foodsService: FoodsDataService, private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllFoods();
  }

  onShow(event: any) {
    this.count = parseInt(event.target.value);
    this.offset = parseInt(environment.OFFSET);
    this.getAllFoods();
  }


  changeGender(event: any) {

    this.count = parseInt(event.target.value);
    this.offset = parseInt(environment.OFFSET);
    this.getAllFoods();
  }

  getAllFoods(): void {
    this.foodsService.getFoods(this.offset, this.count).subscribe(foods => {
      this.foods = foods;
    })
  }

  onDeleteList(foodId: string) {
    const result: boolean = window.confirm(environment.MESSAGE_CONFIRM_DELETE);
    if (result) {
      this.foodsService.deleteFood(foodId).subscribe({
        next: (user) => this.success(),
        error: (error) => this.fail()
      })
    }
  }

  disablePreviousButton(): boolean {
    return this.offset === parseInt(environment.OFFSET);
  }


  disableNextButton(): boolean {
    if (!this.foods) {
      return false;
    }
    return this.foods.length < this.count;
  }

  previousPageButton() {
    if (this.offset >= this.count) {
      this.offset -= this.count;
    }
    this.getAllFoods();
  }

  nextPageButton() {
    this.offset += this.count;
    this.getAllFoods();
  }

  selectedOption: string = environment.NUMBER_SHOW_ITEMS;


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
    this.getAllFoods();

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

  isLogIn() {
    return this.authenticationService.logIn();
  }






}
