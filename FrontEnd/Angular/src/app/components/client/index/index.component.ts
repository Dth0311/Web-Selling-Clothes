import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { LoginService } from '../../../services/login.service';
import { CategoryService } from '../../../services/category.service';
import { CartService } from '../../../services/cart.service';
import { FavoriteService } from '../../../services/favorite.service';
@Component({
  selector: 'app-index',
  //  standalone: true,
  // imports: [],
  templateUrl: './index.component.html',
  styleUrl:'./index.component.css',
  providers: [],

})
export class IndexComponent implements OnInit {
  showDepartment = false;
  showLogin = true;
  listCategoryEnable : any;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private loginService: LoginService,
    private categoryService: CategoryService,
    public cartService: CartService,
    public favoriteService: FavoriteService
    ) {}

  ngOnInit(): void {
    this.getCategoryEnbled();
    if(localStorage.getItem("auth-user") != null){
        this.showLoginAndRegister()
    }
    this.cartService.loadCart();
    this.favoriteService.loadWishList();
  }

  removeWishList(item: any){
    this.favoriteService.remove(item);
  }

  removeFromCart(item:any){
    this.cartService.remove(item);
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  showLoginAndRegister(){
    this.showLogin = !this.showLogin;
  }

  getCategoryEnbled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategoryEnable = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

}
