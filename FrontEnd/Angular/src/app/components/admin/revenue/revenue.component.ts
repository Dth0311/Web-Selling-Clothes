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
    this.orderService.getRevenue(this.startDate, this.endDate).subscribe({
        next:res => {
          console.log(res);
          if(res.revenue == null){
            this.revenue = 0;
            this.countOrder = 0;
          }
          else{
            this.revenue = res.revenue;
            this.countOrder = res.countId;
          }
        },error:err => {
          this.revenue = 0;
          this.countOrder = 0;
          console.log(err);
        }
      });
  }

}
