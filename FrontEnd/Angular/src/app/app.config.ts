import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/client/login/login.component';
import { NgModel } from '@angular/forms';
import { IndexComponent } from './components/client/index/index.component';
import { HomeComponent } from './components/client/home/home.component';
import { ShopGridComponent } from './components/client/shop-grid/shop-grid.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
import { HttpClientModule, HttpHandlerFn, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideHttpClient()
    ]
};

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
  const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`),
  });

  return next(modifiedReq);
};






