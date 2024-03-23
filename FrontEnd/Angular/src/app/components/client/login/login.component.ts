import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { NgForm } from '@angular/forms';
import { TokenService } from '../../../services/token.service';


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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private tokenService: TokenService
    ){
    this.userName = '';
    this.password = '';
    //Inject
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login(){
    alert(this.userName + this.password)
   debugger
    this.loginService.login(this.userName,this.password).subscribe({
      next: res =>{
        if(res == true){
          alert("Đăng ký thành công")
          this.router.navigate(['/login']);
        }
        else{
          alert("username hoặc email đã tồn tại")
        }
      },complete(){
          debugger
          console.log("Đăng ksy 2")
      }
      ,error: err =>{
        if(err.status === 200 && err.error.text != null){
          const token = err.error.text
          this.tokenService.setToken(token)
          alert("Đăng nhập thành công")
          this.router.navigate(['']);
        }else{
          alert("Tài khoản hoặc mật khẩu không chính xác")
        }
      }
    })
  }
}

