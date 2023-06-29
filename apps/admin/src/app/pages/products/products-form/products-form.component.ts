import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriesService,
  Product,
  ProductsService
} from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  isSubmited = false;
  currentProductId: string;
  categories = [];
  imageDisplay: string | ArrayBuffer;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();

    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.currentProductId = param['id'];
        this.getProduct(param['id']);
      }
    });
  }

  getProduct(id: string) {
    this.productsService.getDetailProduct(id).subscribe((product: Product) => {
      const arrayKeys = Object.keys(this.form.controls);
      for (let i = 0; i < arrayKeys.length; i++) {
        console.log(arrayKeys[i]);
        if (arrayKeys[i] === 'category') {
          this.form.controls[arrayKeys[i]].setValue(
            product[arrayKeys[i]].id || ''
          );
        } else {
          this.form.controls[arrayKeys[i]].setValue(product[arrayKeys[i]]);
        }
      }
      this.imageDisplay = product.image;
    });
    this.form.controls['image'].setValidators([]);
    this.form.controls['image'].updateValueAndValidity();
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    const productForm = new FormData();
    const arrayKeys = Object.keys(this.form.controls);
    for (let i = 0; i < arrayKeys.length; i++) {
      if (arrayKeys[i] === 'id' && this.currentProductId) {
        productForm.append(arrayKeys[i], this.currentProductId);
      } else {
        productForm.append(
          arrayKeys[i],
          this.form.controls[arrayKeys[i]].value
        );
      }
    }
    if (!this.currentProductId) {
      this.addProduct(productForm);
    } else {
      this.updateProduct(productForm);
    }
  }

  handleBack() {
    this.location.back();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: ['']
    });
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  addProduct(product: FormData) {
    this.productsService.addProduct(product).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Create product successful!'
        });
        timer(2000).toPromise().then(() => {
          this.handleBack();
        })
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Create product failed!'
        });
      }
    );
  }
  updateProduct(product: FormData) {
    this.productsService.updateProduct(product).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update product successful!'
        });
        timer(2000).toPromise().then(() => {
          this.handleBack();
        })
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Update product failed!'
        });
      }
    );
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    console.log({ file });
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;

        console.log({ imageDisplay: this.imageDisplay });
      };
      fileReader.readAsDataURL(file);
    }

    // this.form.controls["image"].setValue();
  }
}
