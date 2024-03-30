import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../components/client/checkout/order-detail';

const ORDER_API = "http://localhost:8088/api/v1/order";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getListOrder():Observable<any>{
    return this.http.get(ORDER_API,httpOptions);
  }


  getListOrderByUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(ORDER_API + '/user',{params: params});

  }

  placeOrder(firstName: string,lastName:string,country:string,address: string,town: string,state:string,postCode: string,phone:string,email:string,note:string,orderDetailDTOS: OrderDetail[],username: string):Observable<any>{
    return this.http.post(ORDER_API +'/create',{firstName,lastName,country,address,town,state,postCode,phone,email,note,orderDetailDTOS,username},httpOptions);
  }
}
