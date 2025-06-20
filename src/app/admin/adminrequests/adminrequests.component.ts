import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminrequests',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './adminrequests.component.html',
  styleUrl: './adminrequests.component.css'
})
export class AdminrequestsComponent {

  alltestominals: any = []

  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAlltestimonial()
  }

  getAlltestimonial() {
    this.api.getAllTestimonialsApi().subscribe({
      next: (res: any) => {
        this.alltestominals = res
        console.log(this.alltestominals);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  statusChange(id:any,status:string){
    console.log(id,status);
    this.api.updateTestominialStatusApi(id,{status}).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAlltestimonial()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
