import { Component } from '@angular/core';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { AdminheaderComponent } from "../adminheader/adminheader.component";

@Component({
  selector: 'app-adminhome',
  imports: [AdminsidebarComponent, AdminheaderComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {

}
