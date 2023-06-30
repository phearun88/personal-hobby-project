import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FoodsDataService } from '../foods-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../foods/foods.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchForm!: FormGroup;
  name: string = "";
  foods!: Food[];
  offset: number = parseInt(environment.OFFSET);
  count: number = parseInt(environment.COUNT);
  showd: boolean =  false;

  constructor(private foodsService: FoodsDataService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.initFrom();
  }

  getAllFoods(): void {
    this.foodsService.findFoods(this.offset, this.count, this.name).subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => {
        console.log(err);
      }
    });

    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_BLOCK;
    }
  }

  private initFrom() {
    //this.offset;
    this.searchForm = new FormGroup({
      title: new FormControl()
    });
  }

  public search() {
    this.name = this.searchForm.value.title;
    this.getAllFoods();
    this.showd = true;
  }

  disablePreviousButton(): boolean {
    return this.offset === parseInt(environment.OFFSET)
  }

  disableNextButton(): boolean {
    if (!this.foods) {
      return false;
    }
    return this.foods.length < parseInt(environment.COUNT);
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
}
