import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from 'ngx-stripe';
import { environment } from '@env/environment';
import { Order } from '../models/order';
import { Observable, of, switchMap } from 'rxjs';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(
    private httpClient: HttpClient,
    private stripeService: StripeService
  ) {}

  apiURLOrders = environment.apiURL + '/orders';
  apiURLProducts = environment.apiURL + '/products';

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiURLOrders}`);
  }

  getTotalOrders(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURLOrders}/count`);
  }
  getTotalSalesOrders(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiURLOrders}/get/total-sales`);
  }

  getDetailOrder(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiURLOrders}/${id}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.apiURLOrders}`, order);
  }

  deleteOrder(orderId: string): Observable<object> {
    return this.httpClient.delete<object>(`${this.apiURLOrders}/${orderId}`);
  }

  updateOrder(order: Order): Observable<object> {
    return this.httpClient.put<object>(
      `${this.apiURLOrders}/${order.id}`,
      order
    );
  }

  getProduct(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiURLProducts}/${id}`);
  }

  createCheckoutSession(orderItems: OrderItem[]) {
    return this.httpClient
      .post<{ id: string }>(
        `${this.apiURLOrders}/create-checkout-session`,
        orderItems
      )
      .pipe(
        switchMap((session) => of(session.id)),
        switchMap((sessionId) =>
          this.stripeService.redirectToCheckout({ sessionId })
        )
      );
  }

  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  getOrderData() {
    return JSON.parse(localStorage.getItem('orderData'));
  }
}
