import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogin:boolean=false
  username:any=""

  // /in react we use useEffect - in angular we use ngOnInit
  ngOnInit(){
    if (sessionStorage.getItem("token")) {
      this.isLogin=true
      this.username=JSON.parse(sessionStorage.getItem('user')||"").username
      console.log(this.isLogin)
      console.log(this.username);
      
    }
  }

}
