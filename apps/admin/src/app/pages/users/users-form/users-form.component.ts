import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { timer, Subscription } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';
declare const require;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  form: FormGroup;
  isSubmited = false;
  user: User;
  currentUserId;
  countries = [];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.getListCountry();
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [''],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
    this.subscriptions.push(
      this.route.params.subscribe((param) => {
        if (param['id']) {
          this.user = { id: param['id'] };
          this.getDetailUser(param['id']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getListCountry() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesLib.getNames('en', { select: 'official' })
    ).map((item) => {
      return { id: item[0], name: item[1] };
    });
  }

  getDetailUser(id: string) {
    this.subscriptions.push(
      this.usersService.getDetailUser(id).subscribe((user) => {
        this.form.controls['name'].setValue(user.name);
        this.form.controls['password'].setValue(user.password);
        this.form.controls['email'].setValue(user.email);
        this.form.controls['phone'].setValue(user.phone);
        this.form.controls['isAdmin'].setValue(user.isAdmin);
        this.form.controls['street'].setValue(user.street);
        this.form.controls['apartment'].setValue(user.apartment);
        this.form.controls['zip'].setValue(user.zip);
        this.form.controls['city'].setValue(user.city);
        this.form.controls['country'].setValue(user.country);
      })
    );
    this.form.controls['password'].setValidators([]);
    this.form.controls['password'].updateValueAndValidity();
  }

  onSubmit() {
    console.log(this.form.controls);
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    this.user = {
      ...this.user,
      name: this.form.controls['name'].value,
      password: this.form.controls['password'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      isAdmin: this.form.controls['isAdmin'].value,
      street: this.form.controls['street'].value,
      apartment: this.form.controls['apartment'].value,
      zip: this.form.controls['zip'].value,
      city: this.form.controls['city'].value,
      country: this.form.controls['country'].value
    };
    if (this.user.id) {
      this.handleUpdateUser(this.user);
    } else {
      this.handleAddUser(this.user);
    }
    this.handleResetForm();
  }

  handleUpdateUser(user: User) {
    this.subscriptions.push(
      this.usersService.updateUser(user).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update user successful!'
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
            detail: 'Update user failed!'
          });
        }
      )
    );
  }

  handleAddUser(user: User) {
    this.subscriptions.push(
      this.usersService.addUser(user).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create user successful!'
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
            detail: 'Create user failed!'
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
