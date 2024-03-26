import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  showDepartment = false;

  constructor(
    private router: Router,
    public cartService: CartService
    ) {}

    
  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }


  removeFromCart(item:any){
    this.cartService.remove(item);
  }

  updateQuantity(item: any,event: any){
    let quantity : number = event.target.value;
    this.cartService.updateCart(item,quantity);
  }

  plusQuantity(item:any){
    let quantity = Number(item.quantity);
    this.cartService.updateCart(item,quantity+=1);
  } 
  subtractQuantity(item: any){
    if(item.quantity > 1){
      let quantity = Number(item.quantity);
      this.cartService.updateCart(item,quantity-=1);
    }
  }

  goToCheckOut() {
    this.router.navigate(['/checkout']);
  }


  
}
