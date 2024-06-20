import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthState } from '../state/auth/auth.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getLogin } from '../state/auth/auth.selectors';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AuthState>,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    return this.authenticationService.getAuthToken()
      ? true
      : this.router.createUrlTree(['auth']);
  }
}
