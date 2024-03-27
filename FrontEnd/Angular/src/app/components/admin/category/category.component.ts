import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  listCategory : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  categoryForm : any ={
    id: null,
    name : null
  }

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
      this.getListCategory();
  }

  getListCategory(){
    this.categoryService.getListCategory().subscribe({
      next: res =>{
        this.listCategory = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  showForm(){
    this.onUpdate = false;
    this.categoryForm ={
      id : null,
      name : null
    }
    this.displayForm = true;
  }

 onUpdateForm(id: number,name : string){
      this.onUpdate = true;
      this.displayForm =true;
      this.categoryForm.id = id;
      this.categoryForm.name = name;
  }

  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.categoryForm.id = id;
    this.categoryForm.name = name;
  }

  createCategory(){
    const {name} = this.categoryForm;
    this.categoryService.createCategory(name).subscribe({
      next: res =>{
        debugger
        this.getListCategory();
        alert("Tạo danh mục thành công!");
        this.displayForm = false;
      },error: err=>{
        debugger
        alert(err.message);
      }
    })
  }


  updateCategory(){
    const {id,name} = this.categoryForm;
    this.categoryService.updateCategory(id,name).subscribe({
      next: res =>{
        this.getListCategory();
        alert("Cập nhật danh mục thành công!");
        this.displayForm = false;
      },error: err =>{
        alert(err.message);
      }
    })
  }


  enableCategory(id : number){
    this.categoryService.enableCategory(id).subscribe({
      next: res =>{
        debugger
        this.getListCategory();
        alert("Cập nhật thành công!!");
      },error: err=>{
        if(err.status === 200){
          this.getListCategory();
          alert("Cập nhật thành công!!");
        }
        else{
          alert(err.message);
        }
      }
    })
  }


  deleteCategory(){
    const {id} = this.categoryForm;
    this.categoryService.deleteCategory(id).subscribe({
      next: res =>{
        debugger
        this.getListCategory();
        alert("Xóa danh mục thành công!!");
        this.deleteForm = false;
      },error: err=>{
        if(err.status === 200){
          this.getListCategory();
          alert("Xóa danh mục thành công!!");
          this.deleteForm = false;
        }
        else{
          alert(err.message)
        }
      }
    })
  }


}
