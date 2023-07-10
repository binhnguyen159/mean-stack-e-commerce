import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersCartIconComponent } from './orders-cart-icon.component';

describe('OrdersCartIconComponent', () => {
  let component: OrdersCartIconComponent;
  let fixture: ComponentFixture<OrdersCartIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersCartIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersCartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
