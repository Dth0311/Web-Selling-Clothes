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
  listQuantity: any;
  displayForm: boolean = false;
  totalPages:number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 0;
  visiblePages: number[] = [];
  productCountWithID1: number = 0;


  onUpdate : boolean =false;
  showForm : boolean = false;

  productForm: any ={
    productId : null,
    sizeId : null,
    quantity: null,
  };
  ngOnInit(): void {
    this.productForm.quantity = null;
    // this.getListProduct();
    this.getListProductByLimit(this.currentPage,this.itemsPerPage);
    this.getListProductQuantity();
  }
  constructor(
    private messageService : MessageService,
    private productService: ProductService,
    private location:Location
  ){}

  getListProductQuantity(){
    this.productService.getListQuantity().subscribe({
      next: res =>{
        this.listQuantity =res;
        console.log(this.listQuantity)
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
        this.getListProductByLimit(this.currentPage,this.itemsPerPage);
        this.ngOnInit();
      },error: err =>{
        alert(err.message);
      }
    })  
  }

  getListProductByLimit(page:number,limit: number){
    this.productService.getListBylimit(page,limit).subscribe({
      next: res =>{
        this.listProduct =res.products;
        this.totalPages = res.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage,this.totalPages);
      },error: err=>{
        console.log(err);
      }
    })
  }

  onPageChange (page: number) {
    debugger;
    this.currentPage = page;
    this.getListProductByLimit(page, this.itemsPerPage);
    }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  countProducts(index:number) : number {
    this.productCountWithID1 = 0; // Đặt biến đếm về 0 trước khi kiểm tra
    for (let item of this.listQuantity) {
      if (item.product.id === index) {
        this.productCountWithID1++; // Tăng biến đếm nếu sản phẩm có ID là 1
      }
    }
    return this.productCountWithID1;
  }

  idProduct(index:number):number{
    return index;
  }

}
