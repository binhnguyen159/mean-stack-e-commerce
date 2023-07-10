import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart.service';
// components
import { OrdersCartIconComponent } from './components/orders-cart-icon/orders-cart-icon.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
// UI Module
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';

import { MessageService } from 'primeng/api';

// routers
import { ordersRoutes } from './orders.routes';
import { OrdersSummaryComponent } from './components/orders-summary/orders-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

const UI_MODULE = [
  BadgeModule,
  ConfirmDialogModule,
  ToastModule,
  BrowserAnimationsModule,
  ButtonModule,
  InputNumberModule,
  FormsModule,
  ReactiveFormsModule,
  InputTextModule,
  DropdownModule,
  InputMaskModule,
  InputSwitchModule
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ordersRoutes), ...UI_MODULE],
  declarations: [
    OrdersCartIconComponent,
    OrdersPageComponent,
    OrdersSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  exports: [
    OrdersCartIconComponent,
    OrdersPageComponent,
    OrdersSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  providers: [MessageService]
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
