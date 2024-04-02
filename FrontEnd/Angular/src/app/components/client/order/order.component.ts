import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  listOrder:any;
  username: any;
  constructor(
    private orderService: OrderService,
    private tokenService: TokenService
    ){}

 ngOnInit(): void {
    this.username = this.tokenService.getUser();
    this.getListOrder();
  }

  getListOrder(){
    this.orderService.getListOrderByUser(this.username).subscribe({
      next: res=>{
        this.listOrder = res;
        console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }
}
