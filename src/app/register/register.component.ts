import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup//creating FormGroup type(maybe datatype)
  //injucting api services as dependincies fb
  //injucting api services as dependincies api
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.registerForm = fb.group({
      //validating the usrname,password,email through validator class
      username: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  register() {
    if (this.registerForm.invalid) {
      // alert("Invalid data re-enter ")
      Swal.fire({
        title: 'ooh',
        text: ' Please fill the form completly',
        icon: 'info'
      })
    } else {
      // the responce will be only accessable through subscribe 
      // ther are two methord when using subscribe partial and call back
      // in this case we are using partical subscribe
      this.api.registerApi(this.registerForm.value).subscribe({
        next: (result: any) => {//positibe result
          console.log(result);
          Swal.fire({
            title: 'Wow',
            text: 'Registration successfull',
            icon: 'success'
          })

        },
        error: (err: any) => {//negative result
          console.log(err);
          if (err.status == 401) {
            Swal.fire({
              title: 'Oops',
              text: `${err.error}`,
              icon: 'warning'
            })
          }else{
            Swal.fire({
            title:'Oops',
            text:'something went Wrong',
            icon:'error'
          })
          }

        }
      })
    }

  }

}
