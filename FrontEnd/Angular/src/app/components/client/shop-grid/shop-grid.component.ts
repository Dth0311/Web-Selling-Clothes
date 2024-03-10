import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shop-grid',
  standalone: true,
  imports: [],
  templateUrl: './shop-grid.component.html',
  styleUrl: './shop-grid.component.css'
})
export class ShopGridComponent {
  constructor(private router: Router) {}
}
