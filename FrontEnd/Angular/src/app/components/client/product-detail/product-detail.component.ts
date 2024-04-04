import { Component, OnInit,Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-product-detail',

  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit,PipeTransform {
  displayDialog: boolean = false;
  indexImg:number = 0;

  showDialog(index:number) {
    this.indexImg = index;
    this.displayDialog = true;

  }
  id: number = 0;
  listRelatedProduct: any[] =[];
  product : any;
  quantity: number = 1;
  constructor(
    private router: Router, 
    private productService: ProductService,
    private route: ActivatedRoute,
    public cartService: CartService,
    private favoriteService: FavoriteService
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    transform(value: string): string {
      return value.replace(/\n/g, '<br>');
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProduct();
  }

  getProduct(){
    this.productService.getProdct(this.id).subscribe({
      next: res =>{
        this.product = res;
        console.log(this.product);
        this.getListRelatedProduct();
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListRelatedProduct(){
    this.productService.getListRelatedProduct(this.product.categoryId).subscribe({
      next: res =>{
        this.listRelatedProduct= res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  Quantity(){
    if(this.quantity > 1){
      this.quantity -= 1;
    }
  }

  plusQuantity(){
    this.quantity += 1;
  }

  addCart(item:any){
    this.cartService.getItems();
    this.cartService.addToCart(item,this.quantity);
    alert("Add To Cart Successfully!");
  }

  addToCart(item: any){
    this.cartService.getItems();
    this.cartService.addToCart(item,1);
    alert("Add To Cart Successfully!")
  }

  addToWishList(item: any){
    if(!this.favoriteService.productInWishList(item)){
      this.favoriteService.addToWishList(item);
      alert("Add To Wishlist Successfully!")
    }
  }

  previousImage(){

  }

  nextImage(){

  }

  
}



