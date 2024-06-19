import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

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
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) {}

  hide = signal(true);

  username: string = '';
  password: string = '';

  onSubmitLogin(): void {
    this.authenticationService
      .login(this.username, this.password)
      .then((res) => {
        console.log('login success');
        this.authenticationService.setAuthToken(res.data.token);
      })
      .catch((err) => {
        this.authenticationService.setAuthToken(null);
        console.error(err);
      });
  }

  onSubmitRegister(): void {
    this.authenticationService
      .register(this.username, this.password)
      .then((res) => {
        console.log('register success');
        this.authenticationService.setAuthToken(res.data.token);
      })
      .catch((err) => {
        this.authenticationService.setAuthToken(null);
        console.error(err);
      });
  }

  showPassEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }
}
