import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  testimonialForm:FormGroup
  constructor(private fb:FormBuilder,private api:ApiService){
    this.testimonialForm=fb.group({
      name:["",[Validators.required,Validators.pattern('[a-zA-z]*')]],
      email:["",[Validators.required,Validators.email]],
      message:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

    })
  }

  submitForm(){
    if(this.testimonialForm.value.invalid){
      Swal.fire({
        title:"opps",
        text:'please fill the form properly',
        icon:'info'
      })
    }else{
      this.api.addTestimonialApi(this.testimonialForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          Swal.fire({
            title:" Sucessfully",
            text:"added sucessfully"
            ,icon:'success'
          })
          this.testimonialForm.reset()
          
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            title:" Failed",
            text:"adding failed"
            ,icon:'warning'
          })
          
        }
      })
    }
  }
}
