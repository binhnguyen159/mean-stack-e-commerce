import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  numberFeaturedProducts = 5;
  subscriptions: Subscription[] = [];
  selectedCategories: Category[] = [];
  isCategoryPage = false;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    );
    const routing = this.route.params.pipe(
      switchMap((data) => {
        if (data['id']) {
          this.isCategoryPage = true;
          return of(data['id']);
        }
        return of(null);
      }),
      switchMap((categoryId) => {
        console.log('categoryId', categoryId);
        if (categoryId) {
          return this.productsService.getProducts([categoryId]);
        }
        return this.productsService.getProducts();
      })
    );
    this.subscriptions.push(
      routing.subscribe((products) => {
        console.log('products', products);
        this.products = products;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleSelectCategories() {
    const categoriesFilter = this.selectedCategories.map(
      (category) => category.id || ''
    );
    this.subscriptions.push(
      this.productsService
        .getProducts(categoriesFilter)
        .subscribe((products) => {
          this.products = products;
        })
    );
  }
}
