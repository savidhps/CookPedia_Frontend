import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  //value is the item to transform
  // ..args  |using which variable used  to transform
  transform(allRecipes: any[], searchKey: String): any[] {
    let result=[]
    if(!allRecipes || searchKey==""){
      return allRecipes
    }
    result=allRecipes.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))
    return result;
  }

}
