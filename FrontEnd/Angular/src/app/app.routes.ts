import { NgModule,CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'primeng/accordion';
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
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent} from './components/client/register/register.component';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule} from '@angular/common/http';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { SliderModule } from 'primeng/slider';
import { SearchComponent } from './components/client/search/search.component';
import {AuthGuard, AuthService} from './services/auth.service';
import { DashboardComponent } from './components/client/dashboard/dashboard.component';
import { RoleGuard } from './services/role.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

library.add(faBell);

export const routes: Routes = [
    { path:'',component: IndexComponent,
        children: [
            { path:'',component: HomeComponent},
            { path:'category/:id',component: ShopGridComponent},
            { path:'product/:id',component: ProductDetailComponent},
            { path:'cart',component: CartComponent},
            { path:'checkout',component: CheckoutComponent, canActivate: [AuthGuard]}, // check quyền truy cập
            {path:'blog',component: BlogComponent},
            {path:'blog/:id', component: BlogDetailComponent},
            {path:'user',component: UserDetailComponent},
            {path:'order',component: OrderComponent, canActivate: [AuthGuard]},// check quyền truy cập
            {path:'search/:keyword',component: SearchComponent},   
        ]
    },
    { path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    { path:'admin',component: DashboardComponent,canActivate: [RoleGuard],data: {expectedRole: "ROLE_ADMIN"},
    children:[
        
      ]
    },
];
@NgModule({
    declarations: [
        IndexComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        ProductDetailComponent,
        BlogComponent,
        BlogDetailComponent,
        CartComponent,
        UserDetailComponent,
        ShopGridComponent,
        SearchComponent,
        DashboardComponent
    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,        
        AccordionModule,
        OverlayPanelModule,
        ToastModule,
        ButtonModule,
        DividerModule,
        DataViewModule,
        SliderModule
    ],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }

