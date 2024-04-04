import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService,ConfirmationService]
})
export class ProductComponent implements OnInit {
  listProduct: any;
  listCategory: any;
  listImage: any;
  totalPages:number = 0;
  itemsPerPage: number = 5;
  currentPage: number = 0;
  visiblePages: number[] = [];
  

  disabled : boolean = true;

  selectedFiles ?: FileList;
  currentFile ?: File;

  listImageChoosen : any = [];
  imageChoosen : any;
  sizeIds:any = [];

  onUpdate : boolean =false;
  showForm : boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;

  productForm: any ={
    name : null,
    description : null,
    price: null,
    category: null,
    imageIds: []
  };

  constructor(
    private messageService: MessageService,
    private productService: ProductService,
    private imageService: ImageService,
    private categoryService:CategoryService,
    ){

  }

  ngOnInit(): void {
    // this.getListProduct();
    this.getListProductByLimit(this.currentPage,this.itemsPerPage);
    this.getListCategoryEnabled();
    this.getListImage();
  }

  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.listImageChoosen = [];
    this.sizeIds = [];
    this.productForm ={
      id:null,
      name: null,
      description : null,
      price: null,
      category: null,
      imageIds: []
    }
  }

  openUpdate(data : any){
    this.listImageChoosen = [];
    this.sizeIds = [];
    debugger
      this.onUpdate = true;
      this.showForm =true;
      this.productForm.id = data.id;
      this.productForm.name = data.name;
      this.productForm.description = data.description;
      this.productForm.price = data.price;  
      this.productForm.category = data.category.id;
      data.images.forEach((res : any) =>{
        this.listImageChoosen.push(res.id);
      })
      data.sizes.forEach((res : any) =>{
        this.sizeIds.push(res.id);
      })
  }


  onChooseImage(){
    this.showImage =true;
    this.disabled = true;
    let data = document.querySelectorAll('.list-image img');
      data.forEach(i =>{
        i.classList.remove('choosen');
    })  
  }


  getListProduct(){
    this.productService.getListProduct().subscribe({
      next: res =>{
        this.listProduct =res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListProductByLimit(page:number,limit: number){
    this.productService.getListBylimit(page,limit).subscribe({
      next: res =>{
        this.listProduct =res.products;
        this.totalPages = res.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage,this.totalPages);
      },error: err=>{
        console.log(err);
      }
    })
  }

  onPageChange (page: number) {
    debugger;
    this.currentPage = page;
    this.getListProductByLimit(page, this.itemsPerPage);
    }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  getListCategoryEnabled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategory = res;
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



  createProduct(){
    let data = this.listImageChoosen;
    data.forEach((res: any)=>{
      this.productForm.imageIds.push(res);
    })
    const {name,description,price,category,imageIds} = this.productForm;
    this.productService.createProduct(name,description,price,category,imageIds,this.sizeIds).subscribe({
      next: res =>{
        this.getListProductByLimit(this.currentPage,this.itemsPerPage);
        this.showForm = false;
        alert("Thêm mới thành công");
      },error: err =>{
        alert(err.message);
      }
    })
  }

  updateProduct(){
    debugger
    let data = this.listImageChoosen;
    data.forEach((res: any)=>{
      this.productForm.imageIds.push(res);
    })
    const {id,name,description,price,category,imageIds} = this.productForm;
    this.productService.updateProduct(id,name,description,price,category,imageIds).subscribe({
      next: res =>{
        alert("Cập nhật thành công");
        this.getListProductByLimit(this.currentPage,this.itemsPerPage);
        this.showForm = false;
      },error: err =>{
        alert(err.message);
      }
    })

  }

  onDelete(id: number,name: string){
    this.productForm.id = null;
    this.showDelete = true;
    this.productForm.id = id;
    this.productForm.name = name;
  }

  deleteProduct(){
    this.productService.deleteProduct(this.productForm.id).subscribe({
      next: res =>{
        this.getListProduct();
        alert("Xóa thành công");
        this.showDelete = false;
      },error: err =>{
        alert(err.message);
      }
    })
  }

  chooseImage(){
    this.listImageChoosen.push(this.imageChoosen.id);
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
