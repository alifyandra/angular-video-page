import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../state/auth/auth.state';
import { Store } from '@ngrx/store';
import { getLogin } from '../../state/auth/auth.selectors';
import { AuthenticationService } from '../../services/authentication.service';
import { logout } from '../../state/auth/auth.actions';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username$ = this.store.select(getLogin);
  isLoggedIn: boolean = false;

  constructor(
    private store: Store<AuthState>,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onClickSignOut(): void {
    this.authenticationService.setAuthToken(null);
    this.store.dispatch(logout());
    this.router.navigate(['/auth']);
  }
}
