import { Component, ViewChild,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
   standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm! : NgForm

    userName: string;
    email: string;
    password: string;

    constructor(private loginService: LoginService,private router: Router){
      this.userName = '';
      this.email = '';
      this.password = '';
    }

    ngOnInit(): void {
        this.loginService.register
    }

    onChange(){
      console.log("username: " + this.userName)
    }

    register(){
    this.loginService.register(this.userName,this.email,this.password).subscribe({
      next: res =>{
        if(res == true){
          alert("Đăng ký thành công")
          this.router.navigate(['/login']);
        }
        else{
          alert("username hoặc email đã tồn tại")
        }
      },error: err =>{
        console.log("Đăng ký thất bại")
          alert(err)
      }
    })
    }
}
