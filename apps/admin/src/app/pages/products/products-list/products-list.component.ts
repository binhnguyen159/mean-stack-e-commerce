import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscriptions: Subscription[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getProducts() {
    this.subscriptions.push(
      this.productsService.getProducts().subscribe((products) => {
        this.products = products;
      })
    );
  }

  handleUpdateProduct(id: string) {
    this.router.navigateByUrl(`products/form/${id}`);
  }
  handleDeleteProduct(id: string) {
    this.confirmationService.confirm({
      message: 'Do you really want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: string) {
    this.subscriptions.push(
      this.productsService.deleteProduct(id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Remove product successfull'
          });
          this.products = this.products.filter((product) => product.id !== id);
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Remove product falied'
          });
        }
      )
    );
  }
}
