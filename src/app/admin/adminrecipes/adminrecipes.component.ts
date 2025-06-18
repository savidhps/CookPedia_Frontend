import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
    this.recipeForm=fb.group({
      recipeName:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      pretime:["",[Validators.required,Validators.pattern('[0-9]*')]],
      calories:["",[Validators.required,Validators.pattern('[0-9]*')]],
      serving:["",[Validators.required,Validators.pattern('[0-9]*')]],
      cookingTime:["",[Validators.required,Validators.pattern('[0-9]*')]],
      rating:["",[Validators.required,Validators.pattern('[0-9]*')]],
      modeofCooking:["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      mealType:[[],[Validators.required]],
      cuisineTypes:["",[Validators.required]],
      ingredients:[[],[Validators.required]],
      instructions:[[],[Validators.required]],
      image:["",[Validators.required]],
    })
   }

  ngOnInit() {
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
    console.log(this.allrecipes);


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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
