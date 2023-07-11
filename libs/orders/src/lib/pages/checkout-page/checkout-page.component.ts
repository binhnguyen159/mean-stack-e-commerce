import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';
import { CartService, INITIAL_CART } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { forkJoin, Subscription } from 'rxjs';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { UsersService } from '@bluebits/users';
import { StripeService } from 'ngx-stripe';
declare const require;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  countries = [];
  form: FormGroup;
  isSubmitted = false;
  totalMoney = 0;
  userId = '';
  orderItems: OrderItem[];
  subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.getCartData();
    this.initForm();
    this.autoFillUserData();
    this.getListCountry();
    this.cartService.cart$.pipe().subscribe((cart) => {
      if (cart.items && cart.items?.length > 0) {
        forkJoin(
          cart.items.map((item) =>
            this.ordersService.getProduct(item.productId || '')
          )
        ).subscribe((products) => {
          const cartItemsDetail = products.map(
            (product: any, index: number) => ({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: cart?.items && cart?.items[index].quantity
            })
          );
          this.calculateTotalPrice(cartItemsDetail);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  calculateTotalPrice(cartItemsDetails) {
    this.totalMoney = cartItemsDetails.reduce(
      (currentValue, nextItem) =>
        currentValue + nextItem.price * nextItem.quantity,
      0
    );
  }

  initForm() {
    this.form = new FormBuilder().group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  getListCountry() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((item) => {
      return { id: item[0], name: item[1] };
    });
  }

  getDataForm(data: object): Order {
    const keys = Object.keys(data);
    const checkoutForm = {};
    keys.forEach((key) => {
      switch (key) {
        case 'street':
          checkoutForm['shippingAddress1'] = this.checkoutForm[key].value;
          break;
        case 'apartment':
          checkoutForm['shippingAddress2'] = this.checkoutForm[key].value;
          break;

        default:
          checkoutForm[key] = this.checkoutForm[key].value;
      }
    });
    checkoutForm['dateOrdered'] = Date.now();
    checkoutForm['orderItems'] = this.orderItems;
    return checkoutForm;
  }

  handlePlaceOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const order: Order = this.getDataForm(this.checkoutForm);
    this.ordersService.cacheOrderData(order)
    console.log({ order });
    this.subscriptions
      .push
      // this.ordersService.addOrder(order).subscribe(() => {
      //   this.cartService.setCartItemToLocalStorage(INITIAL_CART);
      //   this.cartService.cart$.next(INITIAL_CART);
      //   this.router.navigate(['/success']);
      // })
      (

        this.ordersService
          .createCheckoutSession(this.orderItems)
          .subscribe((session) => {
            console.log('createCheckoutSession', session);
          })
      );

  }

  get checkoutForm() {
    return this.form.controls;
  }

  getCartData() {
    const cartData = this.cartService.getCart() || [];
    this.orderItems = cartData.items.map((item) => ({
      product: item.productId,
      quantity: item.quantity
    }));
  }

  autoFillUserData() {
    this.subscriptions.push(
      this.usersService.observeCurrentUser().subscribe((user) => {
        if (user) {
          this.checkoutForm['name'].setValue(user.name);
          this.checkoutForm['email'].setValue(user.email);
          this.checkoutForm['phone'].setValue(user.phone);
          this.checkoutForm['street'].setValue(user.street);
          this.checkoutForm['apartment'].setValue(user.apartment);
          this.checkoutForm['zip'].setValue(user.zip);
          this.checkoutForm['city'].setValue(user.city);
          this.checkoutForm['country'].setValue(user.country);
          this.checkoutForm['user'].setValue(user.id);
        }
      })
    );
  }
}
