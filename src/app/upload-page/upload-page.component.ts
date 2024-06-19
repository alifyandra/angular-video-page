import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../upload.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss',
})
export class UploadPageComponent {
  file: File | null = null;

  constructor(
    private uploadService: UploadService,
    private authenticationService: AuthenticationService
  ) {}

  onFileChange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  upload() {
    if (this.file && this.authenticationService.getAuthToken()) {
      this.uploadService
        .uploadFile(this.file, this.authenticationService.getAuthToken()!)
        .then((resp) => alert(resp.data))
        .catch((err) => {
          if (err?.response?.status === 401) {
            this.authenticationService.setAuthToken(null);
          }
          console.log(err);
        });
    } else {
      alert('Select a file');
    }
  }
}
