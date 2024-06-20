import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UploadPageComponent } from './components/upload-page/upload-page.component';
import { VideoPlayerPageComponent } from './components/video-player-page/video-player-page.component';
import { VideosPageComponent } from './components/videos-page/videos-page.component';
import { AuthenticationService } from './services/authentication.service';
import { Store } from '@ngrx/store';
import { AuthState } from './state/auth/auth.state';
import { login } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LoginPageComponent,
    UploadPageComponent,
    VideoPlayerPageComponent,
    VideosPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-login-video';

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<AuthState>
  ) {}

  async ngOnInit() {
    const authToken = this.authenticationService.getAuthToken();
    const username = this.authenticationService.getLocalUsername();
    if (authToken && username) {
      if (
        await this.authenticationService.verifyAuthToken(authToken, username)
      ) {
        this.store.dispatch(login({ username: username }));
      } else {
        this.authenticationService.setAuthToken(null);
      }
    } else {
      this.authenticationService.setAuthToken(null);
    }
  }
}
