import { Injectable, OnInit, inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {TokenService} from './token.service';
import { LoginService } from './login.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService{
  isCheck: boolean = false;
  usename: string = "";
  roles: any;
  user: any;

  constructor(
    private router:Router, 
    private tokenService: TokenService,
    private userService: UserService
    ) { }

  canActivate(route: ActivatedRouteSnapshot):boolean{
    debugger
    const expectedRole = route.data['expectedRole'];
    this.isCheck = this.tokenService.isLoggedIn();
    this.roles = this.tokenService.getUserByLocal().role.name;
    console.log(this.roles)
    if( this.isCheck == false || this.roles !== expectedRole){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
  return inject(RoleService).canActivate(route);
}
