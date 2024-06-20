import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { VideoPlayerPageComponent } from './video-player-page/video-player-page.component';
import { VideosPageComponent } from './videos-page/videos-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: LoginPageComponent },
  { path: 'upload', component: UploadPageComponent },
  { path: 'video/:id', component: VideoPlayerPageComponent },
  { path: 'videos', component: VideosPageComponent },
];
