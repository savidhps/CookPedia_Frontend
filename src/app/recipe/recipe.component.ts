import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../service/api.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  allRecipes: any = []
  cusineType: any = []
  mealType:any=[]

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllRecipes()
    // this.getMealType()
  }

  getAllRecipes() {

    this.api.allRecipesApi().subscribe({
      next: (result: any) => {
        this.allRecipes = result
        console.log(this.allRecipes);
        this.allRecipes.forEach((item: any) => {
          !(this.cusineType.includes(item.cuisine)) && this.cusineType.push(item.cuisine)
        });

        this.allRecipes.map((item:any)=>item.mealType).flat().forEach((item:any) => {
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

  // getMealType() {
  //   console.log("inside function");

  //   this.allRecipes.forEach((item:any) => {
  //     console.log(item.mealType);

  //   });


  // }
}
