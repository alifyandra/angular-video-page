import { Component } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { AuthenticationService } from '../../services/authentication.service';
import Upload from '../../models/Upload';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-videos-page',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterLink, MatTableModule],
  templateUrl: './videos-page.component.html',
  styleUrl: './videos-page.component.scss',
})
export class VideosPageComponent {
  videos: Upload[] = [];
  loading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'size', 'uploader', 'created'];
  constructor(
    private uploadService: UploadService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (!this.videos.length) {
      this.uploadService
        .getAllUploads(this.authenticationService.getAuthToken()!)
        .then(
          (res) =>
            (this.videos = res.data.map((video, i) => {
              return {
                ...video,
                createdAt: new Date(video.createdAt).toUTCString(),
              };
            }))
        )
        .catch((err) => {
          if (err.response.status === 401) {
            alert('Unauthorized');
            this.authenticationService.setAuthToken(null);
            router.navigate(['/auth']);
          } else {
            alert('Internal error');
          }
        })
        .finally(() => (this.loading = false));
    }
  }
}
