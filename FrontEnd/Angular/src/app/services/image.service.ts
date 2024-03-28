import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const IMAGE_API = "http://localhost:8088/api/v1/image";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  getList(){
    return this.http.get(IMAGE_API,httpOptions);
  }

  upload(file:File){
    const formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.post<any>(IMAGE_API+'/upload',formData); 
  }
}
