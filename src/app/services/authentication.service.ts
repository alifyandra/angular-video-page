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

  public async verifyAuthToken(token: string, username: string) {
    try {
      const res = await this.axiosService.post(
        '/auth/verifytoken',
        {
          username: username,
        },
        token
      );
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  getLocalUsername(): string | null {
    return window.localStorage.getItem('username');
  }

  setAuthToken(token: string | null, username?: string): void {
    if (token !== null) {
      window.localStorage.setItem('auth_token', token);
      if (username) {
        window.localStorage.setItem('username', username);
      }
    } else {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('username');
    }
  }
}
