import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/client/index/index.component';
import { LoginComponent } from './components/client/login/login.component';
import { RegisterComponent } from './components/client/register/register.component';

@NgModule({
  declarations: [
    IndexComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    NgModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
