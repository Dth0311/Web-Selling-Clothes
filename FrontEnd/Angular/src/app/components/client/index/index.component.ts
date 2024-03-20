import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-index',
  //  standalone: true,
  // imports: [],
  templateUrl: './index.component.html',
  styleUrl:'./index.component.css',
  providers: [],

})
export class IndexComponent {

  constructor(private http: HttpClient,private router: Router) {}

}
