import { EventEmitter, Injectable } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  items : any[] =[];
  
  totalPrice =0;

  total = 0;
  item1:any = [];

  constructor() { }

  saveCart():void{
    localStorage.setItem('cart_items',JSON.stringify(this.items));
  }

  addToCart(item: any,quantity: number,sizeId: number = 1){
    this.item1 = item;
    this.loadCart();
    if(!this.productInCart(this.item1)){
      debugger
      this.item1.quantity = quantity;
      this.item1.subTotal = this.item1.quantity * this.item1.price;
      this.item1.sizeIds.push(sizeId);
      this.items.push(this.item1)
    }
    else{
      let found = false;
      this.items.forEach(res => {
        debugger
        if(!found && res.id === this.item1.id && res.sizeIds[res.sizeIds.length - 1] === sizeId){
          res.quantity += quantity;
          res.subTotal = res.quantity * res.price;
          found = true;
          return;
        }
      });
      if(!found){
        this.item1.quantity = quantity;
          this.item1.subTotal = this.item1.quantity * this.item1.price;
          this.item1.sizeIds[this.item1.sizeIds.length - 1] = sizeId;
          this.items.push(this.item1);
      }
    }
    this.item1.quantity = quantity;
    this.saveCart();
    this.getTotalPrice();
  }


  updateCart(item:any,quantity: number){
    this.items.forEach(res =>{
      if(res.id == item.id){
        res.quantity = quantity;
        res.subTotal = res.quantity * res.price;
      }
    })
    this.saveCart();
    this.getTotalPrice();
  }
  

  productInCart(item: any):boolean{
    return this.items.findIndex((x:any) => x.id == item.id) > -1;
  }
  loadCart():void{
    this.items = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    this.getTotalPrice();
  }

  getItems() {
    return this.items;
    this.getTotalPrice();
  }



  getTotalPrice(){
    this.totalPrice = 0;
    this.total = 0;
    this.items.forEach(res =>{
      this.totalPrice += res.subTotal;
      this.total = this.totalPrice;
    })
    return this.totalPrice;
  }

  remove(item: any){
    const index = this.items.findIndex((o:any) => o.id == item.id);
    if(index > -1){
      this.items.splice(index,1);
      this.saveCart();
    }
    this.getTotalPrice();
  }

  clearCart(){
    this.items = [];
    this.getTotalPrice();
    localStorage.removeItem('cart_items');
  }

}
