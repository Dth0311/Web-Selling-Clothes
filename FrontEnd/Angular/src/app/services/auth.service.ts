import { Injectable, inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isCheck: boolean = false;

  constructor(private router:Router, private tokenService: TokenService) { }

  canActive():boolean{
    this.isCheck = this.tokenService.isLoggedIn();
    if(this.isCheck == false){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}

export const AuthGuard: CanActivateFn = (): boolean => {
  return inject(AuthService).canActive();
}
