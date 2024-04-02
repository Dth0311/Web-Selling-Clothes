import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css',
  providers: [MessageService]
})
export class WarehouseComponent implements OnInit {
  listProduct: any;
  listCategory: any;
  listImage: any;
  listQuantity: any;
  displayForm: boolean = false;

  disabled : boolean = true;

  onUpdate : boolean =false;
  showForm : boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;

  productForm: any ={
    productId : null,
    sizeId : null,
    quantity: null,
  };
  ngOnInit(): void {
    this.productForm.quantity = null;
    this.getListProduct();
    this.getListProductQuantity();
  }
  constructor(
    private messageService : MessageService,
    private productService: ProductService,
    private location:Location
  ){}

  getListProduct(){
    this.productService.getListProduct().subscribe({
      next: res =>{
        this.listProduct =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListProductQuantity(){
    this.productService.getListQuantity().subscribe({
      next: res =>{
        this.listQuantity =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  openUpdate(proId:number,siId: number){
    this.productForm.productId = proId;
    this.productForm.sizeId = siId; 
    this.displayForm = true;
  }

  onUpdateQuantity(){
    debugger
    const {productId,sizeId,quantity} = this.productForm;
    this.productService.updateQuantity(productId,sizeId,quantity).subscribe({
      next: res =>{
        alert("Cập nhật thành công");
        this.displayForm = false;
        this.getListProduct();
        this.ngOnInit();
      },error: err =>{
        alert(err.message);
      }
    })  
  }

}
