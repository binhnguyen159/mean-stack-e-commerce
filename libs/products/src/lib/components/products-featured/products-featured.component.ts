import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products-featured',
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.scss']
})
export class ProductsFeaturedComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  numberFeaturedProducts = 5;
  subscriptions: Subscription[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.productsService
        .getFeaturedProducts(this.numberFeaturedProducts)
        .subscribe((products) => {
          this.products = products;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
