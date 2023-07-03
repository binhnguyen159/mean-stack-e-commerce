import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  apiURLUsers = environment.apiURL + '/users';

  login(data): Observable<{ email: string; token: string }> {
    return this.httpClient.post<{ email: string; token: string }>(
      `${this.apiURLUsers}/authen/login`,
      data
    );
  }

  logout() {
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
