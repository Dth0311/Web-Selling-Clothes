import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrl: './account-user.component.css'
})
export class AccountUserComponent implements OnInit {
  UserName:string = '';
  listAccount : any;
  constructor(
    private userService:UserService
  ){}
  ngOnInit(): void {
    this.getListAccount();
  }

  getListAccount(){
    this.userService.getAccountUser().subscribe({
      next:res =>{
        this.listAccount = res;
        console.log(this.listAccount);
      },error:err => {
        console.log(err);
      }
    })
  }

  enableEmployee(username: string){
    this.userService.enableUser(username).subscribe({
      next:res => {
        debugger
        this.getListAccount();
        alert("Cập nhật thành công");
      },error:err => {
        alert("Cập nhật thất bại");
        console.log(err);
      }
    });
  }
}
