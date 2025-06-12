import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogin: boolean = false
  username: any = ""
 constructor(private router:Router){}
  // /in react we use useEffect - in angular we use ngOnInit
  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.isLogin = true
      this.username = JSON.parse(sessionStorage.getItem('user') || "").username
      // console.log(this.isLogin)
      // console.log(this.username);

    }

  }

  logout() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    this.router.navigateByUrl('/')
    // window.location.reload()
  }




}
