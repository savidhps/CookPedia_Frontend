import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverurl:string='http://localhost:4000'
    // injucting the dependencies in constructor
  constructor(private http:HttpClient) { }
  // api to register
  registerApi(reqBody:any){
    // http class used insted of axios(react)-way better than axios
    return this.http.post(`${this.serverurl}/user-register`,reqBody)
  }
}
