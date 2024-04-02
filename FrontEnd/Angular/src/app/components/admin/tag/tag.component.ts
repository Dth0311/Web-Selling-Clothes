import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent implements OnInit {
  listtag : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  tagForm : any ={
    id: null,
    name : null
  }

  constructor(private tagService: TagService){}

  ngOnInit(): void {
      this.getListCategory();
  }

  getListCategory(){
    this.tagService.getListTag().subscribe({
      next: res =>{
        this.listtag = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  showForm(){
    this.onUpdate = false;
    this.tagForm ={
      id : null,
      name : null
    }
    this.displayForm = true;
  }

 onUpdateForm(id: number,name : string){
      this.onUpdate = true;
      this.displayForm =true;
      this.tagForm.id = id;
      this.tagForm.name = name;
  }

  onDelete(id:number,name : string){
    this.deleteForm = true;
    this.tagForm.id = id;
    this.tagForm.name = name;
  }

  createCategory(){
    const {name} = this.tagForm;
    this.tagService.createTag(name).subscribe({
      next: res =>{
        debugger
        this.getListCategory();
        alert("Tạo tag thành công!");
        this.displayForm = false;
      },error: err=>{
        debugger
        alert(err.message);
      }
    })
  }


  updateCategory(){
    const {id,name} = this.tagForm;
    this.tagService.updateTag(id,name).subscribe({
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
    this.tagService.enableTag(id).subscribe({
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
    const {id} = this.tagForm;
    this.tagService.deleteTag(id).subscribe({
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
