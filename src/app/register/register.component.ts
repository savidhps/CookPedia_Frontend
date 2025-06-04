import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup//creating FormGroup type(maybe datatype)
  //injucting api services as dependincies fb
  //injucting api services as dependincies api
  constructor(private fb:FormBuilder,private api:ApiService){
   this.registerForm= fb.group({
    //validating the usrname,password,email through validator class
      username:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  register(){
    if(this.registerForm.invalid){
      alert("Invalid data re-enter ")
    }else{
      // the responce will be only accessable through subscribe 
      // ther are two methord when using subscribe partial and call back
      // in this case we are using partical subscribe
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(result:any)=>{//positibe result
          console.log(result);
          
        },
        error:(err:any)=>{//negative result
          console.log(err);
          
        }
      })
    }
    
  }

}
