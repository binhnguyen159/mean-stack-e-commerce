import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  form: FormGroup;
  isSubmited = false;
  category: Category;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#ffffff']
    });
    this.subscriptions.push(
      this.route.params.subscribe((param) => {
        if (param['id']) {
          this.category = { id: param['id'] };
          this.getDetailCategory(param['id']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getDetailCategory(id: string) {
    this.subscriptions.push(
      this.categoriesService.getDetailCategory(id).subscribe((category) => {
        this.form.controls['name'].setValue(category.name);
        this.form.controls['icon'].setValue(category.icon);
        this.form.controls['color'].setValue(category.color);
      })
    );
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    this.category = {
      ...this.category,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    };
    if (this.category.id) {
      this.handleUpdateCategory(this.category);
    } else {
      this.handleAddCategory(this.category);
    }
    this.handleResetForm();
  }

  handleUpdateCategory(category: Category) {
    this.subscriptions.push(
      this.categoriesService.updateCategory(category).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update category successful!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.handleBack();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Update category failed!'
          });
        }
      )
    );
  }

  handleAddCategory(category: Category) {
    this.subscriptions.push(
      this.categoriesService.addCategory(category).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create category successful!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.handleBack();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Create category failed!'
          });
        }
      )
    );
  }

  handleResetForm() {
    this.form.reset();
    this.isSubmited = false;
  }

  handleBack() {
    this.location.back();
    this.handleResetForm();
  }
}
