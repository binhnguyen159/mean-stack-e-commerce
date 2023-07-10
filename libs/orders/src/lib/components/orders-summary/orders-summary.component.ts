import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss']
})
export class OrdersSummaryComponent implements OnInit {
  @Input() totalMoney = 0;
  isCheckout = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('checkout')) {
      this.isCheckout = true;
    }
  }

  handleNavigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
