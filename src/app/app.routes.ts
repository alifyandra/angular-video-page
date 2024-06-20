import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UploadPageComponent } from './components/upload-page/upload-page.component';
import { VideoPlayerPageComponent } from './components/video-player-page/video-player-page.component';
import { VideosPageComponent } from './components/videos-page/videos-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: LoginPageComponent },
  { path: 'upload', component: UploadPageComponent, canActivate: [AuthGuard] },
  {
    path: 'video/:id',
    component: VideoPlayerPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'videos', component: VideosPageComponent, canActivate: [AuthGuard] },
];
