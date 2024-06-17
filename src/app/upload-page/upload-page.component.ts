import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss',
})
export class UploadPageComponent {
  file: File | null = null;

  constructor(private uploadService: UploadService) {}

  onFileChange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  upload() {
    if (this.file) {
      this.uploadService.uploadFile(this.file).then((resp) => alert(resp.data));
    } else {
      alert('Select a file');
    }
  }
}
