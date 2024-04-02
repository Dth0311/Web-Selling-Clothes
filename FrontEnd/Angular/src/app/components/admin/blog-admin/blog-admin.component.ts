import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BlogService } from '../../../services/blog.service';
import { ImageService } from '../../../services/image.service';
import { TagService } from '../../../services/tag.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrl: './blog-admin.component.css',
  providers: [MessageService,ConfirmationService]
})
export class BlogAdminComponent implements OnInit {
  listBlog: any;
  listTag : any[] =[];
  listImage: any;
  username: any;
  tag: any;

  disabled : boolean = true;

  selectedFiles ?: FileList;
  currentFile ?: File;

  listImageChoosen : any = [];
  imageChoosen : any;
  image: any;

  onUpdate : boolean =false;
  showForm : boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;

  blogForm: any ={
    id: null,
    title : null,
    description : null,
    content: null,
    imageId: null,
    tags: [],
  };

  constructor(
    private messageService: MessageService,
    private blogService: BlogService,
    private imageService: ImageService,
    private tagService:TagService,
    private router: Router,
    private tokenService: TokenService
    ){

  }

  ngOnInit(): void {
    this.getListBlog();
    this.getListTag();
    this.getListImage();
  }

  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.listImageChoosen = [];
    this.blogForm ={
      id:null,
      title : null,
      description : null,
      content: null,
      imageId: null,
      tags: [],
    }
  }

  openUpdate(data : any){
    this.listImageChoosen = [];
    debugger
      this.onUpdate = true;
      this.showForm =true;
      this.blogForm.id = data.id;
      this.blogForm.title = data.title;
      this.blogForm.description = data.description;
      this.blogForm.content = data.content;  
      this.blogForm.imageId = data.imageId;
      this.tag = data.tags[0];
      this.listImageChoosen.push(data.imageId);
  }


  onChooseImage(){
    this.showImage =true;
    this.disabled = true;
    let data = document.querySelectorAll('.list-image img');
      data.forEach(i =>{
        i.classList.remove('choosen');
    })  
  }


  getListBlog(){
    this.blogService.getList().subscribe({
      next: res =>{
        this.listBlog =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListTag(){
    this.tagService.getListTag().subscribe({
      next: res =>{
        this.listTag = res;
      },error : err=>{
        console.log(err);
      }
    })
  }

  getListImage(){
    this.imageService.getList().subscribe({
      next:res=>{
        this.listImage =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  uploadFile(event: any){
    this.selectedFiles = event.target.files;
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      if(file){
        this.currentFile = file;
        this.imageService.upload(this.currentFile).subscribe({
          next: res =>{
            this.currentFile = undefined;
            this.getListImage();
          },error: err=>{
          }
        })
      }
      this.currentFile = undefined;
    }
  }



  createBlog(){
    this.username = this.tokenService.getUser();
    this.blogForm.tags.push(this.tag);
    const {id,title,description,content,imageId,tags} = this.blogForm;
    this.blogService.createBlog(title,description,content,imageId,tags,this.username).subscribe({
      next: res =>{
        this.getListBlog();
        this.showForm = false;
        alert("Thêm mới thành công");

      },error: err =>{
        alert(err.message);
      }
    })
  }

  updateBlog(){
    this.username = this.tokenService.getUser();
    this.blogForm.tags.push(this.tag);
    const {id,title,description,content,imageId,tags} = this.blogForm;
    this.blogService.updateBLog(id,title,description,content,imageId,tags,this.username).subscribe({
      next: res =>{
        this.getListBlog();
        this.showForm=false;
        alert("Cập nhật thành công");
      },error: err =>{
        if(err.status === 200){
          this.getListBlog();
          this.showForm=false;
          alert("Cập nhật thành công");
        }
        else{
          alert(err.message);
        }
      }
    })

  }

  onDelete(id: number,name: string){
    this.blogForm.id = null;
    this.showDelete = true;
    this.blogForm.id = id;
    this.blogForm.title = name;
  }

  deleteBlog(){
    this.blogService.deleleBlog(this.blogForm.id).subscribe({
      next: res =>{
        this.getListBlog();
        alert("Xóa thành công");
        this.showDelete = false;
      },error: err =>{
        if(err.status === 200){
          this.getListBlog();
          alert("Xóa thành công");
        }
        else{
          alert(err.message)
        }
      }
    })
  }

  chooseImage(){
    this.blogForm.imageId = this.imageChoosen.id;
    this.listImageChoosen = [];
    this.listImageChoosen.push(this.imageChoosen.id);
    this.showImage = false;
  }

  selectImage(event : any,res: any){
    let data = document.querySelectorAll('.list-image img');
    data.forEach(i =>{
      i.classList.remove('choosen');
    })
    event.target.classList.toggle("choosen");
    this.imageChoosen = res;
    this.disabled = false;
    const element = event.target as HTMLElement;
    // Kiểm tra xem phần tử đã có class 'clicked' chưa
    if (!element.classList.contains('clicked')) {
      // Nếu chưa có, thêm class 'clicked'
      element.classList.add('clicked');
    } else {
      // Nếu đã có, loại bỏ class 'clicked'
      element.classList.remove('clicked');
    }
}
}
