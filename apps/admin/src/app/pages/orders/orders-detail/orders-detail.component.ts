import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Order, OrdersService } from '@bluebits/orders';
import { ORDER_STATUS } from '../order.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  constructor(
    private orderService: OrdersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private routes: ActivatedRoute,
    private location: Location
  ) {}

  currentOrderId: string;
  order: Order;
  orderStatuses = [];
  subscriptions: Subscription[] = [];
  selectedStatus: number;

  ngOnInit(): void {
    this.subscriptions.push(
      this.routes.params.subscribe((param) => {
        if (param['id']) {
          this.currentOrderId = param['id'];
          this.getOrderDetail(param['id']);
        }
      })
    );
    this.mappingOrder();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getOrderDetail(id: string) {
    this.subscriptions.push(
      this.orderService.getDetailOrder(id).subscribe((order) => {
        this.order = order;
        this.selectedStatus = order.status;
        console.log(this.order);
      })
    );
  }

  mappingOrder() {
    let statuses = [];
    let index = 0;
    for (const key in ORDER_STATUS) {
      if (ORDER_STATUS[key]) {
        statuses = [...statuses, { ...ORDER_STATUS[key], index }];
      }
      index++;
    }
    this.orderStatuses = statuses;
    console.log('statuses', statuses);
  }

  handleChangeStatus(event) {
    if (event ?? null) {
      this.confirmationService.confirm({
        header: 'Change order status',
        message: 'Are you want to change status of this order',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.changeOrder({ status: event, id: this.currentOrderId });
        }
      });
    }
  }

  changeOrder(data: Order) {
    this.subscriptions.push(
      this.orderService.updateOrder(data).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated!'
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated!'
          });
        }
      )
    );
  }

  handleBack() {
    this.location.back();
  }
}
