import { Injectable } from '@angular/core';
const USER_KEY = 'auth-user';
const USER_NAME = 'username';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken():string | null{
    return localStorage.getItem(USER_KEY);
  }

  setToken(token: string,username: string) : void{
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_NAME);
    localStorage.setItem(USER_KEY,token);
    localStorage.setItem(USER_NAME,username);
  }

  isLoggedIn():boolean{
    if( localStorage.getItem(USER_KEY)){
      return true;
    }
    return false
  }

  removeToken():void{
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_NAME);
  }

  getUser():any{
    return localStorage.getItem(USER_NAME);
  }
}
