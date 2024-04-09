import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BANNER_API = "http://localhost:8088/api/v1/banner";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get(BANNER_API,httpOptions);
  }

  update(id:number,file:File){
    const formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.put(BANNER_API+'/' + id,formData); 
  }

  upload(file:File){
    const formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(BANNER_API+'',formData); 
  }

}
