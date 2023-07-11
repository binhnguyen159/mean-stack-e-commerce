import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';
import { CartService, INITIAL_CART } from '../../services/cart.service';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  orderData: Order;
  // this.ordersService.addOrder(order).subscribe(() => {
  //   this.cartService.setCartItemToLocalStorage(INITIAL_CART);
  //   this.cartService.cart$.next(INITIAL_CART);
  //   this.router.navigate(['/success']);
  // })

  constructor(
    private ordersService: OrdersService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const order = this.ordersService.getOrderData();
    if (order) {
      this.subscriptions.push(
        this.ordersService.addOrder(order).subscribe(() => {
          this.cartService.setCartItemToLocalStorage(INITIAL_CART);
          this.cartService.cart$.next(INITIAL_CART);
          this.router.navigate(['/success']);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
