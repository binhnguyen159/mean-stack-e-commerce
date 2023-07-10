import { Route } from '@angular/router';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuardService } from '@bluebits/users';

export const ordersRoutes: Route[] = [
  { path: 'cart', component: OrdersPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'success', component: ThankYouComponent }
];
