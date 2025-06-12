import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  uploadedImage:string=""

  downloadedRecipes:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getallDownloadedRecipe()
  }

  getallDownloadedRecipe(){
    this.api.getAllUserDownloadedRecipesApi().subscribe({
      next:(res:any)=>{
        this.downloadedRecipes=res
        console.log(this.downloadedRecipes);
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  getFile(event:any){
    console.log(event.target.files[0]);
    //File Reader- cunver files into url
    //create an object for a class
    let fr=new FileReader()
    fr.readAsDataURL(event.target.files[0])//to read the file and convert it into url
    fr.onload=(event:any)=>{//to get the url
      console.log(event.target.result);
      this.uploadedImage=event.target.result
      
    }

  }

}
