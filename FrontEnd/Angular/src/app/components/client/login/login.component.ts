import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { NgForm } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm! : NgForm

  userName: string;
  password: string;

  email: string;
  displayForm:boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenService: TokenService,
    private userService:UserService
    ){
    this.userName = '';
    this.password = '';
    this.email = '';
    //Inject
  }

  goToReset() {
    this.displayForm = !this.displayForm;
  }

  login(){
   debugger
    this.loginService.login(this.userName,this.password).subscribe({
      next: res =>{
        if(res == true){
          alert("Đăng nhập thành công")
          this.router.navigate(['/login']);
        }
        else{
          alert("username hoặc email đã tồn tại")
        }
      },complete(){
          debugger
      }
      ,error: err =>{
        if(err.status === 200 && err.error.text != null){
          const token = err.error.text
          this.tokenService.setToken(token,this.userName)
          this.userService.getUserByUsername(this.userName).subscribe({
            next: res =>{
              this.tokenService.saveUser(res);
              if(res.role.name == "ROLE_ADMIN"){
                alert("Đăng nhập thành công")
                this.router.navigate(['/admin']);
              }
              else if(res.role.name == "ROLE_EMPLOYEE"){
                if(res.enable == false){
                  alert("Tài khoản đã bị khóa")
                  this.router.navigate(['/login']);
                }else{
                  alert("Đăng nhập thành công")
                  this.router.navigate(['/employee']);
                }
              }
              else{
                alert("Đăng nhập thành công")
                this.router.navigate(['']);
              }
            },error: err=>{
              console.log(err);
            }
          });
        }else{
          alert("Tài khoản hoặc mật khẩu không chính xác")
        }
      }
    })
  }

  resetPw(){
    this.userService.resetPassword(this.email).subscribe({
      next:res => {

      },error:err => {
        if(err.status === 200){
          alert("Mật khẩu mới đã được gửi về mail!");
          this.displayForm = !this.displayForm;
        }
        else{
          alert("Mail không tồn tại!")
          console.log(err)
        }
      }
    });
  }
}

