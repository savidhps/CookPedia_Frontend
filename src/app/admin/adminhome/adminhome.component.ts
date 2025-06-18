import { Component } from '@angular/core';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminhome',
  imports: [AdminsidebarComponent, AdminheaderComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {

  allusers:any=[]=[]
  allRecipes:any[]=[]
  totalCount:any=""

  constructor(private api:ApiService){}

  ngOnInit(){
    // allrecipe count 
    this.api.allRecipesApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allRecipes=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
    // allusers 

    this.api.getAllUsersApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allusers=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

    // all downloads

    this.api.getAllDownloadsApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        let count=res.map((item:any)=>item.count).reduce((n1:any,n2:any)=>n1+n2)
        this.totalCount=count
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

    



    
  }

}
