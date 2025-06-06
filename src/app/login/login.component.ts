import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup
  //router for navagiating in ts
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'ohoo',
        text: "fill the form completely",
        icon: 'info'
      })
    } else {
      this.api.loginApi(this.loginForm.value).subscribe({
        next: (result: any) => {
          console.log(result);
          Swal.fire({
            title: 'hi',
            text: "Login sucessfull",
            icon: 'success'
          })
          sessionStorage.setItem('user',JSON.stringify(result.existingUser))
          sessionStorage.setItem("token",result.token)
          this.router.navigateByUrl('/')

        },
        error: (err: any) => {
          if (err.status == 401 || err.status == 404) {
            Swal.fire({
              title: 'ohoo',
              text: `${err}`,
              icon: 'warning'
            })
          }
        }
      })
    }
  }

  
}
