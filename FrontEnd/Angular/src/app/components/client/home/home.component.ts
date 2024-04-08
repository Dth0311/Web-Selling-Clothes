import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FavoriteService } from '../../../services/favorite.service';
import { CartService } from '../../../services/cart.service';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  listProductNewest : any;
  listProductPrice: any;
  listBlogNewest: any;
  constructor(
    private router: Router,
    private productService: ProductService,
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private blogService: BlogService
    ) {}
  ngOnInit(): void {
    this.getListProduct();
    this.getListBlog();
  }

  goToProductDetail() {
    this.router.navigate(['/product']);
  }

  getListProduct(){
    this.productService.getListProductNewest(8).subscribe({
      next: res =>{
        debugger
        this.listProductNewest = res;
      },error: err =>{
        debugger
        console.log(err);
      }
    })
    this.productService.getListProductByPrice().subscribe({
      next:res =>{
        this.listProductPrice =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  
  getListBlog(){
    this.blogService.getListNewest(3).subscribe({
      next: res =>{
        debugger
        this.listBlogNewest = res;
      },error: err =>{
        debugger
        console.log(err);
      }
    })
  }

  addToWishList(item: any){
    if(!this.favoriteService.productInWishList(item)){
      alert("Add To Wishlist Successfully!")
      this.favoriteService.addToWishList(item);
    }
  }

  addToCart(item: any){
    this.cartService.getItems();
    alert("Add To Cart Successfully!")
    this.cartService.addToCart(item,1);
  }
}
