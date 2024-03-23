import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../../services/token.service';
import { LoginService } from '../../../services/login.service';
import { CategoryService } from '../../../services/category.service';
import { CartService } from '../../../services/cart.service';
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
    private cartService: CartService
    ) {}

  ngOnInit(): void {
    this.getCategoryEnbled();
    if(localStorage.getItem("auth-user") != null){
        this.showLoginAndRegister()
    }
    this.cartService.loadCart();
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
