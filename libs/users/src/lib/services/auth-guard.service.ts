import { Injectable } from '@angular/core';
import {
  CanActivateFn,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localstorageService: LocalstorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localstorageService.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log({ tokenDecode });
      if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp))
        return true;
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }

  _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
