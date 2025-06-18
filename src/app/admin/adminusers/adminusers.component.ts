import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminusers',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css'
})
export class AdminusersComponent {

    allUsers:any = [];
  constructor(private api:ApiService){}

  ngOnInit(){
     this.fetchAllUsers()
  }

  fetchAllUsers(){
    this.api.getAllUsersApi().subscribe({
      next: (res:any)=>{
         this.allUsers = res.filter((item:any)=>item.role !='admin')
         console.log(this.allUsers);
         
      },

      error:(err:any) => {
        console.log(err);
      }
    })
  }

}
