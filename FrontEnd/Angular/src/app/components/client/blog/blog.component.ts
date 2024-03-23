import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../../../services/tag.service';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  listTag : any;
  listBlogNewest: any;
  listBlog : any;
  constructor(
    private router: Router,
    private tagService: TagService,
    private blogService: BlogService
    ) {}

  ngOnInit(): void {
    this.getListTag();
    this.getListNewest();
    this.getListBlog();
  }

  getListTag(){
    this.tagService.getListTag().subscribe({
      next: res =>{
        this.listTag = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListNewest(){
    this.blogService.getListNewest(3).subscribe({
      next: res=>{
        this.listBlogNewest = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  
  getListBlog(){
    this.blogService.getList().subscribe({
      next: res =>{
        this.listBlog = res;
        console.log(this.listBlog)
      },error: err =>{
        console.log(err);
      }
    })
  }

  goToBlogDetail() {
    this.router.navigate(['/blogid']);
  }

  
}
