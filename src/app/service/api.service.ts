import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//RegisterApi Api
export class ApiService {
  serverurl: string = 'http://localhost:4000'
  // injucting the dependencies in constructor
  constructor(private http: HttpClient) { }
  // api to register
  registerApi(reqBody: any) {
    // http class used insted of axios(react)-way better than axios
    return this.http.post(`${this.serverurl}/user-register`, reqBody)
  }
  // LoginApi
  loginApi(reqBody: any) {
    return this.http.post(`${this.serverurl}/user-login`, reqBody)
  }
  // api to get all home recipes
  homeRecipesApi(){
    return this.http.get(`${this.serverurl}/home-recipes`)
  }
  // api to get all recipes
  allRecipesApi(){
    return this.http.get(`${this.serverurl}/all-recipes`)
  }
  appendToken(){
    //1)create instance for httpHeaders class
    let headers=new HttpHeaders()
    const token=sessionStorage.getItem("token")
    if(token){
      headers=headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }

  viewRecipeApi(id:string){
    return this.http.get(`${this.serverurl}/view/${id}`,this.appendToken())
  }
}

