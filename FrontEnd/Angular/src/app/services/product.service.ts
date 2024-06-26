import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const PRODUCT_API = "http://localhost:8088/api/v1/product";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  
  getListProduct():Observable<any>{
    return this.http.get(PRODUCT_API,httpOptions);
  }

  getListProductNewest(num: number):Observable<any>{
    return this.http.get(PRODUCT_API + '/listnew/' + num,httpOptions);
  }

  getListProductByPrice():Observable<any>{
    return this.http.get(PRODUCT_API + '/price',httpOptions);
  }

  getListRelatedProduct(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + '/related/' + id,httpOptions);
  }

  getListByCategory(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + '/category/' + id,httpOptions);
  }

  searchProduct(keyword: string,page: number,limit:number,sort:string):Observable<any>{
    let params = new HttpParams();
    params =params.append('keyword',keyword);
    params = params.append('page',page);
    params = params.append('limit',limit);
    params = params.append('sort',sort);
    return this.http.get(PRODUCT_API + '/search',{params: params});
  }

  getListByPriceRange(id: number, min:number, max: number):Observable<any>{
    let params = new HttpParams();
    params = params.append('id',id);
    params = params.append('min',min);
    params = params.append('max',max);
    return this.http.get(PRODUCT_API + '/range',{params: params})
  }

  getListBylimit(page: number, limit:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('page',page);
    params = params.append('limit',limit);
    return this.http.get(PRODUCT_API + '/limit',{params: params})
  }

  getListBylimitCategory(categoryId: number,page: number, limit:number,sort:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('categoryId',categoryId);
    params = params.append('page',page);
    params = params.append('limit',limit);
    params = params.append('sort',sort);
    return this.http.get(PRODUCT_API + '/category',{params: params})
  }

  getProdct(id: number):Observable<any>{
    return this.http.get(PRODUCT_API + "/"+ id,httpOptions);
  }

  createProduct(name:string,description: string,price: string,categoryId: number,imageIds: Array<string>,sizeIds: Array<string>):Observable<any>{
    return this.http.post(PRODUCT_API,{name,description,price,categoryId,imageIds,sizeIds},httpOptions);
  }

  updateProduct(id: number,name:string,description: string,price: string,categoryId: number,imageIds: Array<string>):Observable<any>{
    return this.http.put(PRODUCT_API + '/update/'+id,{name,description,price,categoryId,imageIds},httpOptions);
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete(PRODUCT_API + '/delete/' + id,httpOptions);
  }

  updateQuantity(productId: number,sizeId: number,quantity: number):Observable<any>{
    return this.http.put(PRODUCT_API + '/quantity',{productId,sizeId,quantity},httpOptions);
  }

  getListQuantity():Observable<any>{
    return this.http.get(PRODUCT_API + '/quantity',httpOptions);
  }

  getQuantity(productId: number,sizeId: number):Observable<any>{
    return this.http.get(PRODUCT_API + '/numPorduct?productId=' + productId + '&sizeId=' + sizeId,httpOptions);
  }

}
