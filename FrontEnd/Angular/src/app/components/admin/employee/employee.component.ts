import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeeName:string = '';
  listEmployee : any;
  constructor(
    private userService:UserService
  ){}
  ngOnInit(): void {
    this.getListEmployee();
  }

  getListEmployee(){
    this.userService.getEmployee().subscribe({
      next:res =>{
        this.listEmployee = res;
        console.log(this.listEmployee);
      },error:err => {
        console.log(err);
      }
    })
  }

  updateEmployee(username: string){
    this.userService.updateRole(username).subscribe({
      next:res => {
        this.getListEmployee();
        alert("Phân quyền thành công");
      },error:err => {
        alert("Không tìm thấy username");
        console.log(err);
      }
    });
  }

  enableEmployee(username: string){
    this.userService.enableUser(username).subscribe({
      next:res => {
        debugger
        this.getListEmployee();
        alert("Cập nhật thành công");
      },error:err => {
        console.log(err);
      }
    });
  }

}
