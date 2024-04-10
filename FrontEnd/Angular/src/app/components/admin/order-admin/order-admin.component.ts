import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrl: './order-admin.component.css'
})
export class OrderAdminComponent implements OnInit {

  listOrder : any;

  ngOnInit(): void {
   this.getListOrder();
  }
  constructor(
    private orderService: OrderService
  ){}

  getListOrder(){
    this.orderService.getListOrder().subscribe({
      next: res=>{
        this.listOrder = res;
        console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }

  enableOrder(id : number){
    this.orderService.enableOrder(id).subscribe({
      next: res =>{
        debugger
        this.getListOrder();
        alert("Cập nhật thành công!!");
      },error: err=>{
        if(err.status === 200){
          this.getListOrder();
          alert("Cập nhật thành công!!");
        }
        else{
          alert(err.message);
        }
      }
    })
  }
}
