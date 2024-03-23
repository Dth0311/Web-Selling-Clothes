import { Injectable } from '@angular/core';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken():string | null{
    return localStorage.getItem(USER_KEY);
  }

  setToken(token: string) : void{
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY,token);
  }

  isLoggedIn():boolean{
    if( localStorage.getItem(USER_KEY)){
      return true;
    }
    return false
  }
}
