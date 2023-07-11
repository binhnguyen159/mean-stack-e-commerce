import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

// Stripe module
import { NgxStripeModule } from 'ngx-stripe'

// Components
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';

// Module
import { UiModule } from '@bluebits/ui';
import { ProductsModule } from '@bluebits/products';
import { OrdersModule } from '@bluebits/orders';

import { JwtInterceptor, UsersModule } from '@bluebits/users';

// UI_module
import { ButtonModule } from 'primeng/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const UI_MODULE = [ProductsModule, ButtonModule];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    // ProductListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UiModule,
    OrdersModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot("pk_test_51NSWrjHMXZU8CGVPgfL1DWYsynqMi9e9cWHMGnIBC7EaZzMVAXIohph8QbtJco6EaaG8Sx0bIxk6cGeQlw9PBT6R0034OPUYSf"),
    ...UI_MODULE
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
