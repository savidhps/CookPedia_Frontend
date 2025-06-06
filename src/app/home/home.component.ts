import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api:ApiService){}
  HomeRecipe:any=[]

    ngOnInit(){
      this.getAllHomeRecipes()
    }
    
  getAllHomeRecipes(){
    this.api.homeRecipesApi().subscribe({
      next:(result:any)=>{
        this.HomeRecipe=result
        console.log(this.HomeRecipe);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
