import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { usersRoutes } from './users.routes';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

const UX_MODULE = [
  InputTextModule,
  CheckboxModule,
  RadioButtonModule,
  FormsModule,
  ReactiveFormsModule,
  ButtonModule
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersRoutes), UX_MODULE],
  declarations: [LoginComponent]
})
export class UsersModule {}
