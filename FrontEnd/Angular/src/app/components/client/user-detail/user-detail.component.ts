import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  ngOnInit(): void {
    this.username = this.tokenService.getUser();
    this.getUser();
  }

  constructor(
    private tokenService: TokenService,
    private userService: UserService
    ){
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.country = '';
      this.state = '';
      this.address = '';
      this.phone = '';
      }
  username: any;
  user :any;

  changePassword : boolean = false;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    state:string;
    address: string;
    phone: string;

  changePasswordForm: any= {
    oldPassword : null,
    newPassword: null
  }

  getUser(){
    this.userService.getUser(this.username).subscribe({
      next: res=>{
        debugger
        this.user = res;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.email = res.email;
        this.country = res.country;
        this.state = res.state;
        this.address = res.address;
        this.phone = res.phone;
      },error : err =>{
        console.log(err);
      }
    })
  }

  updateProfile(){
    this.userService.updateProfile(this.tokenService.getUser(),this.firstName,this.lastName,this.email,this.country,this.state,this.address,this.phone).subscribe({
      next: res =>{
        debugger
        alert("Cập nhật thông tin thành công")
        this.getUser();
      },error: err=>{
        debugger
        console.log(err);
      }
    })
  }
}
