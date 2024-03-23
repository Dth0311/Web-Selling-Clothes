import { Component, OnInit ,PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { TagService } from '../../../services/tag.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit,PipeTransform{
  id: any;
  blog: any;
  listBlogNewest: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getBlog();
    this.getListNewest();
  }

  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private tagService: TagService
    ){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  getBlog(){
    this.blogService.getBlog(this.id).subscribe({
      next: res =>{
        this.blog = res;
        console.log(this.blog);
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListNewest(){
    this.blogService.getListNewest(3).subscribe({
      next: res =>{
        this.listBlogNewest = res;
      },error: err=>{
        console.log(err);
      }
    })
  }

}
