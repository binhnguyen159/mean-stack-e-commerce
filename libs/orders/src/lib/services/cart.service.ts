import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { BehaviorSubject } from 'rxjs';
export const CART_KEY = 'cart';
export const INITIAL_CART = { items: [] };
@Injectable({
  providedIn: 'root'
})
export class CartService {
  // constructor() {}
  cart: Cart = INITIAL_CART;
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(INITIAL_CART);

  initCartLocalStorage() {
    const initialCart = {
      items: []
    };
    if (this.getCart()) {
      this.cart$.next(this.getCart());
      return;
    }
    this.setCartItemToLocalStorage(initialCart);
  }

  setCartItemToLocalStorage(cart: Cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = this.getCart();
    if (cart.items && cart.items.length >= 0) {
      const listCartId = cart.items.map(
        (cartItemData) => cartItemData.productId
      );

      if (listCartId.includes(cartItem.productId)) {
        cart.items = cart.items.map((item) => {
          if (item.productId === cartItem.productId) {
            return {
              ...item,
              quantity:
                cartItem.status === 'add'
                  ? (item.quantity || 0) + (cartItem.quantity || 0)
                  : cartItem.quantity || 0
            };
          }
          return item;
        });
      } else {
        cart.items = [...cart.items, cartItem];
      }
    }
    this.setCartItemToLocalStorage(cart);
    this.cart = cart;
    this.cart$.next(cart);
    return cart;
  }

  getCart() {
    if (localStorage.getItem(CART_KEY)) {
      return JSON.parse(localStorage.getItem(CART_KEY) || '');
    }
    return null;
  }

  deleteCartItem(productId: string) {
    if (this.cart.items && this.cart.items.length > 0) {
      this.cart.items = this.cart.items.filter(
        (item) => item.productId !== productId
      );
    }
    this.setCartItemToLocalStorage(this.cart);
    this.cart$.next(this.cart);
  }
}
