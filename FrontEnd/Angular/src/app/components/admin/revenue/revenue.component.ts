import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.css'
})
export class RevenueComponent implements OnInit {
  listOrderDetail:any;

  startDate: string = "";
  endDate: string = "";
  revenue: number = 0;
  countOrder:number = 0;
  constructor(
    private orderService:OrderService,
  ){}
  ngOnInit(): void {
    this.getListOrderDetail();
    this.getRevenue();
  }

  getListOrderDetail(){
    this.orderService.getListOrderDetail().subscribe({
      next:res=>{
        this.listOrderDetail = res;
      },error:err=>{
        console.log(err);
      }
    });
  }

  getRevenue() {
    this.orderService.getRevenue(this.startDate, this.endDate)
      .subscribe(data => {
        console.log(data);
        this.revenue = data.revenue;
        this.countOrder = data.countId;
      });
  }

}
