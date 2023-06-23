import { Route } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const appRoutes: Route[] = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductListComponent }
];
