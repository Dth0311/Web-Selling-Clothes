import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  constructor(private router: Router) {}
}
