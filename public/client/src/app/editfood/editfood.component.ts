import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Food } from '../foods/foods.component';
import { FoodsDataService } from '../foods-data.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.css']
})
export class EditfoodComponent {
  food!: Food;


  constructor(private route: ActivatedRoute, private foodsService: FoodsDataService, private _router: Router) { }
  foodId = this.route.snapshot.params[environment.FOOD_ID]

  foodUpdateFormGroup!: FormGroup;

  update(form: FormGroup) {

    const result: boolean = window.confirm(environment.MESSAGE_CONFIRM_UPDATE);
    if (result) {
      this.foodsService.upateFood(this.foodId,form.value).subscribe(foods => {
        this._router.navigate([environment.FOODS_ENDPOINT]);
      })
    }

  }

  initForm() {
    this.foodUpdateFormGroup = new FormGroup({
      name: new FormControl(),
      image: new FormControl(),
      ingredients: new FormControl()
    })
  }
  setValtoform(food: Food){
    this.foodUpdateFormGroup = new FormGroup({
      name: new FormControl(this.food.name),
      image: new FormControl(this.food.image),
      ingredients: new FormControl(this.food.ingredients)
    })
  }

  ngOnInit(): void {
    this.initForm();
    if (this.foodId != undefined) {
      this.foodsService.getFood(this.foodId).subscribe(food => {
        this.food = food;
        this.setValtoform(food);
      })
    }
  }
}
