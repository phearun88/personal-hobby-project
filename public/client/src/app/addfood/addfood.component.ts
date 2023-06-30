import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodsDataService } from '../foods-data.service';
import { Food } from '../foods/foods.component';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-addfood',
  templateUrl: './addfood.component.html',
  styleUrls: ['./addfood.component.css']
})
export class AddfoodComponent {
  food!: Food;


  constructor(private route: ActivatedRoute, private foodsService: FoodsDataService, private _router: Router) { }

  addFoodFormGroup!: FormGroup;
  register(form: FormGroup) {
    this.foodsService.addFood(form.value).subscribe(foods => {
      this._router.navigate([environment.FOODS_ENDPOINT]);
    })

  }

  initForm() {
    this.addFoodFormGroup = new FormGroup({
      name: new FormControl(),
      image: new FormControl(),
      ingredients: new FormControl(),
      country: new FormControl(),
      zipcode: new FormControl()

    })
  }

  ngOnInit(): void {
    this.initForm();

  }
}
