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
import { CategoryComponent } from './components/admin/category/category.component';
import { ProductComponent } from './components/admin/product/product.component';
import { OrderAdminComponent } from './components/admin/order-admin/order-admin.component';
import { Order } from './components/client/checkout/order';
import { TagComponent } from './components/admin/tag/tag.component';
import { BlogAdminComponent } from './components/admin/blog-admin/blog-admin.component';
import { WarehouseComponent } from './components/admin/warehouse/warehouse.component';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CarouselModule} from 'primeng/carousel';
import { SwiperModule } from 'swiper/types/shared';
import { BannerAdminComponent } from './components/admin/banner-admin/banner-admin.component';
import { RevenueComponent } from './components/admin/revenue/revenue.component';

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
        { path:'category',component: CategoryComponent},
        { path:'product',component: ProductComponent},
        { path:'order',component: OrderAdminComponent},
        { path:'tag',component: TagComponent},
        { path:'blog',component: BlogAdminComponent},
        { path:'warehouse',component: WarehouseComponent},
        { path:'banner',component: BannerAdminComponent},
        { path:'revenue',component: RevenueComponent},
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
        DashboardComponent,
        CategoryComponent,
        ProductComponent,
        CheckoutComponent,
        OrderComponent,
        OrderAdminComponent,
        TagComponent,
        BlogAdminComponent,
        WarehouseComponent,
        BannerAdminComponent,
        RevenueComponent
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
        CardModule,
        DialogModule,
        TableModule,
        DividerModule,
        DataViewModule,
        SliderModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        InputNumberModule,
        ToolbarModule,
        FileUploadModule,
        ConfirmDialogModule,
        InputTextareaModule,
        InputTextModule,
        CarouselModule,
        RadioButtonModule,
    ],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }

