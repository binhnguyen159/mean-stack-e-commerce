import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Subscription, forkJoin } from 'rxjs';
import { CartItemDetail } from '../../models/cart-item-detail';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  cartItemsDetail: CartItemDetail[] = [];
  quantity = 0;
  cartCount = 0;
  subscriptions: Subscription[] = [];
  totalMoney = 0;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartService.cart$.pipe().subscribe((cart) => {
        if (cart.items && cart.items?.length > 0) {
          forkJoin(
            cart.items.map((item) => this.getProductInfo(item.productId || ''))
          ).subscribe((products) => {
            this.cartCount = products.length;
            this.cartItemsDetail = products.map(
              (product: any, index: number) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: cart?.items && cart?.items[index].quantity
              })
            );

            // this.cartItemsDetail = this.cartItemsDetail.map((item, index) => ({
            //   ...item,
            //   quantity: cart?.items && cart?.items[index].quantity
            // }));
            this.calculateTotalPrice();
            console.log('cart.items', this.cartItemsDetail);
          });
        }
      })
    );
  }

  calculateTotalPrice() {
    this.totalMoney = this.cartItemsDetail.reduce(
      (currentValue, nextItem) =>
        (currentValue += (nextItem.price || 0) * (nextItem.quantity || 0)),
      0
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleRemoveCartItem(productId: string) {
    this.cartService.deleteCartItem(productId);
  }

  handleGoBack() {
    this.router.navigate(['/products']);
  }

  getProductInfo(id: string) {
    return this.ordersService.getProduct(id);
  }

  handleOnInput(event: InputNumberInputEvent, cartItemDetail: CartItemDetail) {
    this.calculateTotalPrice();
    const cartItem: CartItem = {
      productId: cartItemDetail.id,
      quantity: cartItemDetail.quantity,
      status: 'update'
    };
    this.cartService.setCartItem(cartItem);
  }
}
