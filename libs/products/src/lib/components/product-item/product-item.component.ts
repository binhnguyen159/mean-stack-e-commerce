import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService, CartItem } from '@bluebits/orders';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = {};

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('product');
  }

  AddProductToCart(product: Product) {
    const cartItem: CartItem = {
      productId: product.id,
      quantity: 1,
      status: 'add'
    };
    this.cartService.setCartItem(cartItem);
  }
}
