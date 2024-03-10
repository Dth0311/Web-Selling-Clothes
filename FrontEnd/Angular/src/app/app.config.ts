import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LoginComponent } from './components/client/login/login.component';
import { NgModel } from '@angular/forms';
import { IndexComponent } from './components/client/index/index.component';
import { HomeComponent } from './components/client/home/home.component';
import { ShopGridComponent } from './components/client/shop-grid/shop-grid.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};





