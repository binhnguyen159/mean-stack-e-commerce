import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subscription } from 'rxjs';

declare const require;
@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[];
  subscriptions: Subscription[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
      this.users = users.map((user) => ({
        ...user,
        country: countriesLib.getName(user.country, 'en')
      }));
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  handleUpdateUser(id: string) {
    this.router.navigateByUrl(`users/form/${id}`);
  }

  handleDeleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Do you really want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(id);
      }
    });
  }

  deleteUser(id: string) {
    this.subscriptions.push(
      this.usersService.deleteUser(id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Remove category successfull'
          });
          this.users = this.users.filter((category) => category.id !== id);
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Remove category falied'
          });
        }
      )
    );
  }
}
