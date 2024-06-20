import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Store } from '@ngrx/store';
import { login } from '../state/auth/auth.actions';
import { AuthState } from '../state/auth/auth.state';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    SpinnerComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AuthState>,
    private router: Router
  ) {}

  hide = signal(true);

  username: string = '';
  password: string = '';

  loading: boolean = false;

  onSubmitLogin(): void {
    this.loading = true;
    this.authenticationService
      .login(this.username, this.password)
      .then((res) => {
        console.log('login success');
        this.authenticationService.setAuthToken(res.data.token, this.username);
        this.store.dispatch(login({ username: this.username }));
        this.router.navigate(['/upload']);
      })
      .catch((err) => {
        this.authenticationService.setAuthToken(null);
        console.error(err);
      })
      .finally(() => (this.loading = false));
  }

  onSubmitRegister(): void {
    this.loading = true;
    this.authenticationService
      .register(this.username, this.password)
      .then((res) => {
        console.log('register success');
        this.authenticationService.setAuthToken(res.data.token, this.username);
        this.store.dispatch(login({ username: this.username }));
        this.router.navigate(['/upload']);
      })
      .catch((err) => {
        this.authenticationService.setAuthToken(null);
        console.error(err);
      })
      .finally(() => (this.loading = false));
  }

  showPassEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }
}
