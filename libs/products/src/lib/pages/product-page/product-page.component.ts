import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CartItem, CartService } from '@bluebits/orders';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product = {};
  subscriptions: Subscription[] = [];
  quantity = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  ngOnInit(): void {
    const getDetail = this.route.params.pipe(
      switchMap((param) => {
        if (param['id']) {
          return of(param['id']);
        }
        return of(null);
      }),
      switchMap((productId) => {
        return this.getProductDetail(productId);
      })
    );

    this.subscriptions.push(
      getDetail.subscribe((product) => {
        console.log({ product });
        this.product = product;
      })
    );
  }

  getProductDetail(id: string) {
    return this.productService.getDetailProduct(id);
  }

  AddProductToCart(product: Product) {
    const cartItem: CartItem = {
      productId: product.id,
      quantity: this.quantity
    };
    this.cartService.setCartItem(cartItem);
    console.log('Add');
  }
}
