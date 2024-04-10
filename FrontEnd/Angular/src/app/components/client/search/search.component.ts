import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
 
  keyword: any;
  listProduct:any;
  listProductNewest:any;
  listCategory :any;
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
    public favoriteSevice:FavoriteService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    this.keyword = this.route.snapshot.params['keyword'];
    this.getListProduct(this.keyword,this.currentPage,this.itemsPerPage);
    this.getListCategoryEnabled();
    this.getNewestProduct();
  }

  getListProduct(keyword:string,page:number,limit: number){
    this.productService.searchProduct(keyword,page,limit,this.sort).subscribe({
      next:res =>{
        this.listProduct = res.products;
        this.totalPages = res.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage,this.totalPages);
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

  onPageChange (page: number) {
    debugger;
    this.currentPage = page;
    this.getListProduct(this.keyword,page, this.itemsPerPage);
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


  addToCart(item: any){
    this.cartService.getItems();
    this.cartService.addToCart(item,1,1);
  }
  
  addToWishList(item: any){
    if(!this.favoriteSevice.productInWishList(item)){
      this.favoriteSevice.addToWishList(item);
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
