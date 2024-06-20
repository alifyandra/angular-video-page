import { Component, Input, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { AuthenticationService } from '../../services/authentication.service';
import Upload from '../../models/Upload';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-video-player-page',
  standalone: true,
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CommonModule,
    SpinnerComponent,
  ],
  templateUrl: './video-player-page.component.html',
  styleUrl: './video-player-page.component.scss',
})
export class VideoPlayerPageComponent implements OnInit {
  preload: string = 'auto';
  api: VgApiService | undefined;
  video: Upload | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private uploadService: UploadService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.video) {
      const videoId = Number(this.route.snapshot.params['id']);
      this.uploadService
        .getUpload(videoId, this.authenticationService.getAuthToken()!)
        .then((res) => {
          console.log(res);
          this.video = res.data;
          this.video!.createdAt = new Date(this.video!.createdAt).toUTCString();
          console.log(this.video);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert('Video with id ' + videoId + ' does not exist.');
            this.router.navigate(['/videos']);
          } else if (err.response.status === 401) {
            alert('Unauthorized');
            this.authenticationService.setAuthToken(null);
            this.router.navigate(['/auth']);
          } else {
            console.error(err);
            alert('Internal error');
          }
        })
        .finally(() => (this.loading = false));
    }
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
  }
}
