import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { ProductSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsFeaturedComponent } from './components/products-featured/products-featured.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

// UI_module
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
// MOdule
import { UiModule } from '@bluebits/ui';

// Router
import { productsRoutes } from './products.routes';
import { CartItemComponent } from './components/cart-item/cart-item.component';

const UI_MODULE = [
  CheckboxModule,
  ButtonModule,
  FormsModule,
  RatingModule,
  InputNumberModule
];
@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes),
    CommonModule,
    HttpClientModule,
    RouterModule,
    UiModule,
    ...UI_MODULE
  ],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductsFeaturedComponent,
    ProductsListComponent,
    ProductPageComponent,
    CartItemComponent
  ],
  exports: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    ProductsFeaturedComponent,
    ProductsListComponent,
    ProductPageComponent,
    CartItemComponent
  ]
})
export class ProductsModule {}
