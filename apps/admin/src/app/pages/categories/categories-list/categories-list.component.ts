import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  handleUpdateCategory(id: string) {
    this.router.navigateByUrl(`categories/form/${id}`);
  }

  handleDeleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Do you really want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCategory(id);
      }
    });
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Remove category successfull'
        });
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Remove category falied'
        });
      }
    );
  }
}
