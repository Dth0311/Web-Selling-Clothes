import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/client/home/home.component';
import { LoginComponent } from './components/client/login/login.component';
import { IndexComponent } from './components/client/index/index.component';
import { ShopGridComponent } from './components/client/shop-grid/shop-grid.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
import { CartComponent } from './components/client/cart/cart.component';
import { CheckoutComponent } from './components/client/checkout/checkout.component';
import { BlogComponent } from './components/client/blog/blog.component';
import { BlogDetailComponent } from './components/client/blog-detail/blog-detail.component';
import { UserDetailComponent } from './components/client/user-detail/user-detail.component';
import { OrderComponent } from './components/client/order/order.component';

export const routes: Routes = [
    { path:'',component: IndexComponent,
        children: [
            { path:'',component: HomeComponent},
            { path:'category',component: ShopGridComponent},
            { path:'product',component: ProductDetailComponent},
            { path:'cart',component: CartComponent},
            { path:'checkout',component: CheckoutComponent}, // check quyền truy cập
            {path:'blog',component: BlogComponent},
            {path:'blogid', component: BlogDetailComponent},
            {path:'user',component: UserDetailComponent},
            {path:'order',component: OrderComponent},
        ]
    },
    { path:'login',component: LoginComponent}
];
@NgModule({
    declarations: [
        IndexComponent
    ],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

