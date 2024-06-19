import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { VideoPlayerPageComponent } from './video-player-page/video-player-page.component';
import { VideosPageComponent } from './videos-page/videos-page.component';

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
export class AppComponent {
  title = 'angular-login-video';
}
