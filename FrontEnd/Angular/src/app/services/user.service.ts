import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const USER_API = "http://localhost:8088/api/v1/user";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(USER_API,{params: params})
  }

  
  getUserByUsername(username: string):Observable<any>{
    return this.http.get(USER_API + "?username=" + username,httpOptions)
  }


  updateProfile(userName: string,firstName: string,lastName:string,email:string,country:string,state:string,address: string,phone: string):Observable<any>{
    return this.http.put(USER_API +'/update',{userName,firstName,lastName,email,country,state,address,phone},httpOptions);
  }

}
