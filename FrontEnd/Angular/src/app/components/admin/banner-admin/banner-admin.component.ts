import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../services/banner.service';

@Component({
  selector: 'app-banner-admin',
  templateUrl: './banner-admin.component.html',
  styleUrl: './banner-admin.component.css'
})
export class BannerAdminComponent implements OnInit{
  showForm: boolean = false;
  onUpdate : boolean =false;
  listBanner:any;
  listImageChoosen : any = [];
  imageId: number = 0;

  selectedFiles ?: FileList;
  currentFile ?: File;

  constructor(
    private bannerService:BannerService
  ) {}

  ngOnInit(): void {
    this.getListBanner();
  }

  getListBanner(){
    this.bannerService.getList().subscribe({
      next:res =>{
        this.listBanner = res;
        console.log(this.listBanner);
      },error:err =>{
        console.log(err);
      }
    });
  }

  openUpdate(data : any){
    debugger
      this.onUpdate = true;
      this.showForm =true;
      this.imageId = data.id;
  }

  uploadFile(event: any){
    this.selectedFiles = event.target.files;
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      if(file){
        this.currentFile = file;
        this.bannerService.update(this.imageId,this.currentFile).subscribe({
          next: res =>{
            this.currentFile = undefined;
            alert("Cập nhật banner thành công")
            this.showForm = false;
          },error: err=>{
          }
        })
      }
      this.currentFile = undefined;
    }
  }

}
