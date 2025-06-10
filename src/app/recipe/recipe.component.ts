import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../service/api.service';
import { isNgTemplate } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

//comenent is a deceroater |metadata
@Component({
  selector: 'app-recipe',
  //search pipe is a custome pipe
  imports: [HeaderComponent,RouterLink, DatePipe, FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  p: number = 1;//just a variable holding value one -used for pagenation

  time: any = new Date()

  allRecipes: any = []
  cusineType: any = []
  mealType: any = []
  dummyArray: any = []//for filtering
  searchKey: string = ""



  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllRecipes()
    // this.getMealType()
  }

  getAllRecipes() {

    this.api.allRecipesApi().subscribe({
      next: (result: any) => {
        this.allRecipes = result
        this.dummyArray = result//for filtering
        console.log(this.allRecipes);
        this.allRecipes.forEach((item: any) => {
          !(this.cusineType.includes(item.cuisine)) && this.cusineType.push(item.cuisine)
        });

        this.allRecipes.map((item: any) => item.mealType).flat().forEach((item: any) => {
          !(this.mealType.includes(item)) && this.mealType.push(item)

        });

        console.log(this.cusineType);
        console.log(this.mealType);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  filterCusine(item: any) {
    console.log(item);
    this.allRecipes = this.dummyArray.filter((recipe: any) => recipe.cuisine == item)
  }

  filterMealType(item: any) {
    console.log(item);

    this.allRecipes = this.dummyArray.filter((recipe: any) => recipe.mealType.includes(item))
  }
  allRecipeButton() {
    this.allRecipes = this.dummyArray
  }
}
