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

  isValidToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp);
    }
    return false;
  }

  _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      }
      return null;
    }
    return null;
  }
}
