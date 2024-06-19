import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-videos-page',
  standalone: true,
  imports: [],
  templateUrl: './videos-page.component.html',
  styleUrl: './videos-page.component.scss',
})
export class VideosPageComponent {
  constructor(
    private uploadService: UploadService,
    private authenticationService: AuthenticationService
  ) {
    this.uploadService
      .getAllUploads(this.authenticationService.getAuthToken() || '')
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }
}
