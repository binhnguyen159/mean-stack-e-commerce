import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[];
  subscriptions: Subscription[] = [];
  orderStatuses = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.ordersService.getOrders().subscribe((orders) => {
        console.log(orders);
        this.orders = orders;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleUpdateOrder(id: string) {
    this.router.navigateByUrl(`orders/view/${id}`);
  }

  handleDeleteOrder(id: string) {
    this.confirmationService.confirm({
      message: 'Do you really want to delete this order?',
      header: 'Delete order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteOrder(id);
      }
    });
  }

  deleteOrder(id: string) {
    this.subscriptions.push(
      this.ordersService.deleteOrder(id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Remove order successfull'
          });
          this.orders = this.orders.filter((order) => order.id !== id);
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Remove order falied'
          });
        }
      )
    );
  }
}
