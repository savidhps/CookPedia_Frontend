import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  uploadedImage: string = ""
  user: any = {}
  downloadedRecipes: any = []
  uploadStatus: any = ""

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user") || "")
    if (this.user.profile) {
      this.uploadedImage = this.user.profile
    }
    this.getallDownloadedRecipe()

  }

  getallDownloadedRecipe() {
    this.api.getAllUserDownloadedRecipesApi().subscribe({
      next: (res: any) => {
        this.downloadedRecipes = res
        console.log(this.downloadedRecipes);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  getFile(event: any) {
    console.log(event.target.files[0]);
    //File Reader- conveert files into url
    //create an object for a class
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])//to read the file and convert it into url
    fr.onload = (event: any) => {//to get the url
      console.log(event.target.result);
      this.uploadedImage = event.target.result;
      this.uploadStatus=this.uploadedImage

    }

  }

  upload() {

    if (this.uploadStatus) {
      this.api.updateProfileApi({ "profileImage": this.uploadedImage }).subscribe({
        next: (res: any) => {
          console.log(res);
          this.uploadedImage = res.profile
          sessionStorage.setItem("user", JSON.stringify(res))
          this.uploadStatus=""
          Swal.fire({
            title: 'YHAAHOO',
            text: 'profile Image Updated',
            icon: 'success'
          })

        },
        error: (err: any) => {
          console.log(err);
          Swal.fire({
            title: 'OOps',
            text: 'please upload a profile Image',
            icon: 'error'
          })

        }
      })
    } else {
      Swal.fire({
        title: 'NOP',
        text: 'please upload a profile Image',
        icon: 'info'
      })
    }

  }




}
