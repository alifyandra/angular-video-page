import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private axiosService: AxiosService) {}

  public register(username: string, password: string) {
    return this.axiosService.post('/auth/register', {
      username: username,
      password: password,
    });
  }

  public login(username: string, password: string) {
    return this.axiosService.post('/auth/login', {
      username: username,
      password: password,
    });
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem('auth_token', token);
    } else {
      window.localStorage.removeItem('auth_token');
    }
  }
}
