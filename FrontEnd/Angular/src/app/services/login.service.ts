import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Login_API = "http://localhost:8088/api/v1/login/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  register(userName: string, email: string, password: string):Observable<any>{
    return this.http.post(Login_API + 'signup',{userName,email,password},httpOptions);
  }

  login(userName: string,password: string):Observable<any>{
    return this.http.post(Login_API+ `signin`,{userName,password},httpOptions);
  }
  // login(userName: string,password: string):Observable<any>{
  //   return this.http.post(Login_API+ `signin`,{userName,password},{headers});
  // }
}
