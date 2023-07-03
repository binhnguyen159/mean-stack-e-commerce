import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  dashboard: {
    orders?: number;
    customers?: number;
    products?: number;
    totalSales?: number;
  };
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      forkJoin([
        this.ordersService.getTotalOrders(),
        this.usersService.getTotalUsers(),
        this.productsService.getTotalProducts(),
        this.ordersService.getTotalSalesOrders()
      ]).subscribe(
        ([totalOrders, totalCustomer, totalProducts, totalSalesOrders]) => {
          this.dashboard = {
            orders: totalOrders,
            customers: totalCustomer,
            products: totalProducts,
            totalSales: totalSalesOrders
          };
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
