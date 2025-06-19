import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminrecipes',
  imports: [AdminheaderComponent, AdminsidebarComponent, FormsModule, SearchPipe, NgMultiSelectDropDownModule, ReactiveFormsModule],
  templateUrl: './adminrecipes.component.html',
  styleUrl: './adminrecipes.component.css'
})
export class AdminrecipesComponent {

  allrecipes: any[] = []
  searchkey: string = ""
  cuisineTypes: any = []
  allMealTypes: any = []

  // dropdown
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItems: any = [];
  //  input get from forms
  recipeForm: FormGroup


  constructor(private api: ApiService, private fb: FormBuilder) {
    this.recipeForm = fb.group({
      recipeName: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      pretime: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      calories: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      serving: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      cookingTime: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      rating: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      modeofCooking: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      mealType: [[], [Validators.required]],
      cuisineTypes: ["", [Validators.required]],
      ingredients: [[], [Validators.required]],
      instructions: [[], [Validators.required]],
      image: ["", [Validators.required]],
    })
  }

  ngOnInit() {
    
    this.getAllRecipes()
    // dropdown in model

    this.dropdownList = [
      { item_id: 1, item_text: 'Lunch' },
      { item_id: 2, item_text: 'Dinner' },
      { item_id: 3, item_text: 'Snack' },
      { item_id: 4, item_text: 'Dessert' },
      { item_id: 5, item_text: 'Side Dish' },
      { item_id: 6, item_text: 'Appetizer' },
      { item_id: 7, item_text: 'Snacks' },
      { item_id: 8, item_text: 'Breakfast' },
      { item_id: 8, item_text: 'Beverage' },


    ];

    this.selectedItems = [
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  getAllRecipes(){
    this.api.allRecipesApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allrecipes = res
        res.forEach((item: any) => {
          // console.log(item.mealType)
          !this.cuisineTypes.includes(item.cuisine)
            &&
            this.cuisineTypes.push(item.cuisine)

          item.mealType.forEach((foodtype: any) => {
            !this.allMealTypes.includes(foodtype) && this.allMealTypes.push(foodtype)
          })
        })
        console.log(this.cuisineTypes, this.allMealTypes)

      },
      error: (err: any) => {
        console.log(err);

      }
    })

  }

  onItemSelect(item: any) {
    console.log(item);
    this.recipeForm.value.mealType.push(item.item_text)
  }
  onSelectAll(items: any) {
    console.log(items);
    items.forEach((item: any) =>
      this.recipeForm.value.mealType.push(item.item_text)
    )
  }
  onDeleteItem(items: any) {
    console.log(items);
    this.recipeForm.value.mealType = this.recipeForm.value.mealType.filter(
      (meal: any) => meal != items.item_text
    )
  }
  onDeleteAll() {
    this.recipeForm.value.mealType = []
  }
  addIngredients(data: any) {
    console.log(data.value)
    this.recipeForm.value.ingredients.push(data.value)
    data.value = ""

  }
  addInstructions(data: any) {
    console.log(data.value)
    this.recipeForm.value.instructions.push(data.value)
    data.value = ""
  }

  getFile(event: any) {
    console.log(event.target.files[0]);
    //File Reader- conveert files into url
    //create an object for a class
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])//to read the file and convert it into url
    fr.onload = (event: any) => {//to get the url
      console.log(event.target.result);
      this.recipeForm.value.image = event.target.result;


    }

  }

  save() {
    console.log("inside save");
    console.log(this.recipeForm.value);
    const { recipeName, pretime, calories, serving, cookingTime, rating, modeofCooking, mealType, cuisineTypes, ingredients, instructions, image } =
      this.recipeForm.value
    if (!recipeName || !pretime || !calories || !serving || !cookingTime || !rating || !modeofCooking || mealType.length == 0 || !cuisineTypes || ingredients.length == 0 || instructions.length == 0 || !image) {
      Swal.fire({
        title: "OPPS",
        text: "fill the form conpletly",
        icon: "info"
      })
    }else{
      this.api.addNewRecipeApi(this.recipeForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
  }


  deleteRecipe(id:any){
    this.api.deleteRecipeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllRecipes()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
