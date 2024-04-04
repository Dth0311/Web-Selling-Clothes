import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { FavoriteService } from '../../../services/favorite.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrl: './shop-grid.component.css',
  providers: [MessageService]
})
export class ShopGridComponent implements OnInit {
  id: number = 0;
  listProduct : any;
  listCategory : any;
  listProductNewest : any[] = [];
  rangeValues = [0,100];
  totalPages:number = 0;
  itemsPerPage: number = 5;
  currentPage: number = 0;
  visiblePages: number[] = [];
  sort:string = "idHight";
  isClicked0: boolean = true;
  isClicked1: boolean = false;
  isClicked2: boolean = false;
  isClicked3: boolean = false;
  constructor(
    private categoryService:CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public cartService:CartService,
    public favoriteService:FavoriteService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getListProductByLimit(this.id,this.currentPage,this.itemsPerPage);
    this.getListCategoryEnabled();
    this.getNewestProduct();
  }

  getListProductByLimit(categoryId:number,page:number,limit: number){
    this.productService.getListBylimitCategory(categoryId,page,limit,this.sort).subscribe({
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
    this.getListProductByLimit(this.id,page, this.itemsPerPage);
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

  getListProductByCategory(){
    this.productService.getListByCategory(this.id).subscribe({
      next: res =>{
        this.listProduct = res;
      },error: err =>{
        console.log(err);
      } 
    })
  }

  getListCategoryEnabled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategory = res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  getNewestProduct(){
    this.productService.getListProductNewest(4).subscribe({
      next:res =>{
        this.listProductNewest = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListProductByPriceRange(){
    this.productService.getListByPriceRange(this.id,this.rangeValues[0],this.rangeValues[1]).subscribe({
      next: res =>{
        this.listProduct = res;
        console.log(this.listProduct);
      },error: err =>{
        console.log(err);
      }
    })
  }

  addToCart(item: any){
    this.cartService.getItems();
    this.cartService.addToCart(item,1);
  }
  
  addToWishList(item: any){
    if(!this.favoriteService.productInWishList(item)){
      this.favoriteService.addToWishList(item);
    }
  }

  sortById(){
    this.isClicked1 = !this.isClicked1;
    this.isClicked2 = false;
    this.isClicked3 = false;
    this.isClicked0 = false;
    this.sort = "id";
    this.ngOnInit();
  }

  sortByIdHight(){
    this.isClicked0 = true;
    this.isClicked2 = false;
    this.isClicked3 = false;
    this.isClicked1 = false;
    this.sort = "idHight";
    this.ngOnInit();
  }

  sortByPrice(){
    this.isClicked2 = !this.isClicked2;
    this.isClicked1 = false;
    this.isClicked3 = false;
    this.isClicked0 = false;
    this.sort = "price";
    this.ngOnInit();
  }

  sortByPriceHight(){
    this.isClicked3 = !this.isClicked3;
    this.isClicked2 = false;
    this.isClicked1 = false;
    this.isClicked0 = false;
    this.sort = "priceHight";
    this.ngOnInit();
  }
}
