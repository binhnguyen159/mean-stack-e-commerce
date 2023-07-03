import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmited = false;
  login: { email?: string; password?: string };
  authErr = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmited = true;
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.login = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.authService.login(this.login).subscribe(
      (user) => {
        this.authErr = '';
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/']);
        console.log({ user });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.authErr = err.error['message'];
      }
    );
  }

  resetForm() {
    this.loginForm.reset();
    this.isSubmited = false;
    // this.authErr
  }
}
