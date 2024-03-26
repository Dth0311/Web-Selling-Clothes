import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(public tokenService: TokenService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const token = localStorage.getItem("auth-user");
      //  alert(token);
       if(token){
        req = req.clone({
         setHeaders: {
               Authorization: `Bearer ${token}`,
           }, 
        });

       }
       return next.handle(req);
    }
}

