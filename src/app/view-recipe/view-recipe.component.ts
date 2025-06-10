import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-recipe',
  imports: [HeaderComponent],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  // Activatedroute class used for access data from the path

  constructor(private route:ActivatedRoute,private api:ApiService){}
  //property params it return observable -suscribe partial observable |can use callback

    ngOnInit(){
      this.route.params.subscribe((res:any)=>{
        console.log(res);
        
      })
    }

    getViewRecipe(id:string){
      this.api.viewRecipeApi(id).subscribe({
        next:(res:any)=>{
          console.log(res);
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
}
