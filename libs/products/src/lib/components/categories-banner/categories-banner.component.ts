import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  subscriptions: Subscription[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.categoriesService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
