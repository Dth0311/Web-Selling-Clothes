import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { TokenService } from '../../../services/token.service';
import { OrderDetail } from './order-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] =[];
  username !: string;

  orderForm :any ={
    firstname: null,
    lastname : null,
    country : null,
    addrest : null,
    town : null,
    state : null,
    postCode: null,
    email: null,
    phone: null,
    note: null
  }

  constructor(
    public cartService: CartService,
    private orderService:OrderService,
    private tokenService: TokenService,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.username = this.tokenService.getUser();
    this.cartService.getItems();
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  placeOrder(){
    debugger
    this.cartService.items.forEach(res =>{
      let orderDetail : OrderDetail = new OrderDetail;
      orderDetail.productId = res.id;
      orderDetail.price = res.price;
      orderDetail.quantity = res.quantity;
      orderDetail.subTotal = res.subTotal;
      orderDetail.sizeId = res.sizeIds[res.sizeIds.length-1];
      this.listOrderDetail.push(orderDetail);
    })
    console.log(this.listOrderDetail)

    const {firstname,lastname,country,address,town,state,postCode,phone,email,note} = this.orderForm;
    this.orderService.placeOrder(firstname,lastname,country,address,town,state,postCode,phone,email,note,this.listOrderDetail,this.username).subscribe({
      next: res =>{
        debugger
        this.cartService.clearCart();
        alert("Đặt hàng thành công")
      },error: err=>{
        if(err.status === 200){
          this.cartService.clearCart();
          alert("Đặt hàng thành công");
          this.router.navigate(["/"]);
        }
        else{
          console.log(err);
        }
      }
    })

  }
  
}
