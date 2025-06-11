import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipiesDetails: any = {}
  allrelatedRecipes: any = []

  // Activatedroute class used for access data from the path

  constructor(private route: ActivatedRoute, private api: ApiService) { }
  //property params it return observable -suscribe partial observable |can use callback

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      this.getViewRecipe(res.id)
    })
  }

  getViewRecipe(id: string) {
    this.api.viewRecipeApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.recipiesDetails = res

        this.relatedRecipe(res.cuisine)

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  relatedRecipe(cuisine: any) {
    this.api.relatedRecipesApi(cuisine).subscribe({
      next: (res: any) => {
        this.allrelatedRecipes = res
        console.log(this.allrelatedRecipes);
        // if(res.length>0){
        //   this.allrelatedRecipes=res.filter((item:any)=>item.name!=this.recipiesDetails)
        // }
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  addSaveRecipe() {
    this.api.addSaveReciesApi(this.recipiesDetails._id, this.recipiesDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "ayoo",
          text: 'Recipe saved sucessfully',
          icon: 'success'
        })

      },
      error: (err: any) => {
        console.log(err);
        console.log(err);
        if (err.status == 406) {
          Swal.fire({
            title: "ayoo",
            text: `${err.error}`,
            icon: 'info'
          })
        } else if (err.status == 500) {
          Swal.fire({
            title: "ayoo",
            text: `Failed to save`,
            icon: 'warning'
          })
        }

      }
    })
  }


    addDownloadRecipe() {
      this.generatePdf()
    this.api.addDownloadRecipeApi(this.recipiesDetails._id, this.recipiesDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "YAAAHoo",
          text: ' Downloading started  sucessfully',
          icon: 'success'
        })

      },
      error: (err: any) => {
        console.log(err);
        console.log(err);
          Swal.fire({
            title: "ayoo",
            text: `Failed to Download`,
            icon: 'error'
          })
      }
    })
  }

  generatePdf(){
    // 1)create an object or instance for js pdf class
    const pdf=new jsPDF()

    pdf.setTextColor('blue')
    pdf.setFontSize(25)//to set font size
    pdf.text(this.recipiesDetails.name,15,10)
    pdf.setTextColor('green')

    pdf.setFontSize(12)
    pdf.text(`Cusinine:${this.recipiesDetails.cuisine}`,20,20)//to create text
    pdf.text(`Calories Per Serving:${this.recipiesDetails.caloriesPerServing}`,20,25)
    pdf.text(`Cook Time in Minutes:${this.recipiesDetails.cookTimeMinutes}`,20,30)
    pdf.text(`Mode of cooking:${this.recipiesDetails.difficulty}`,20,35)
    pdf.text(`Preparation Time in Minutes:${this.recipiesDetails.prepTimeMinutes}`,20,40)

    const head=[['Ingredients','Instruction']]
    const body=[[this.recipiesDetails.ingredients,this.recipiesDetails.instructions]]

    autoTable(pdf,{head,body,startY:50})//to create table
    pdf.output('dataurlnewwindow')//opens in new tab
    pdf.save(`${this.recipiesDetails.name}.pdf`)//name of the file to 
  }

}
