import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './orders-cart-icon.component.html',
  styleUrls: ['./orders-cart-icon.component.scss']
})
export class OrdersCartIconComponent implements OnInit, OnDestroy {
  cartCount = '0';
  subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartService.cart$.subscribe(
        (cart) => {
          console.log('cart$', cart);
          this.cartCount = (cart.items?.length || 0).toString();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated cart!'
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Can not update cart!'
          });
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
