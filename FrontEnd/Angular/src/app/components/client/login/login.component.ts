import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm! : NgForm

  userName: string = 'haitit';
  password: string = '1234';

  constructor(private loginService: LoginService,private router: Router){
    this.userName = 'haitit';
    this.password = '1234';
    //Inject
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login(){
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
        if(err.status === 200){
          alert("Đăng nhập thành công")
          this.router.navigate(['']);
        }
      }
    })
  }
}

