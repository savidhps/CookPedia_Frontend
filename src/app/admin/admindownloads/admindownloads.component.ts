import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-admindownloads',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './admindownloads.component.html',
  styleUrl: './admindownloads.component.css'
})
export class AdmindownloadsComponent {
    allDownloads:any = [];
  constructor(private api:ApiService){}

  ngOnInit(){
    this.fetchAllDownloads()
  }

  fetchAllDownloads(){
    this.api.getAllDownloadsApi().subscribe({
      next:(res:any) =>{
        this.allDownloads = res;
      },

      error:(err:any)=>{console.log(err)}
    })
  }

}
