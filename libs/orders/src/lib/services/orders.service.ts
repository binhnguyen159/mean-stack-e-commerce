import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  apiURLOrders = environment.apiURL + '/orders';

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
}
