import { Injectable } from '@angular/core';
const TOKEN = 'jwtToken';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  // constructor() {}

  setToken(token) {
    localStorage.setItem(TOKEN, token);
  }
  getToken(): string {
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
