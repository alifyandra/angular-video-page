import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth/auth.state';
import { getLogin } from '../../state/auth/auth.selectors';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent, MatButtonModule],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.scss',
})
export class UploadPageComponent implements OnDestroy {
  file: File | null = null;
  username$!: Subscription;
  loading: boolean = false;

  constructor(
    private uploadService: UploadService,
    private authenticationService: AuthenticationService,
    private store: Store<AuthState>,
    private router: Router
  ) {}

  onFileChange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  upload() {
    this.username$ = this.store.select(getLogin).subscribe((username) => {
      if (username && this.authenticationService.getAuthToken()) {
        if (this.file) {
          this.loading = true;
          this.uploadService
            .uploadFile(
              this.file,
              username,
              this.authenticationService.getAuthToken()!
            )
            .then((resp) => {
              this.router.navigate(['/video', resp.data]);
            })
            .catch((err) => {
              if (err?.response?.status === 401) {
                alert('Unauthorized');
                this.authenticationService.setAuthToken(null);
                this.router.navigate(['/auth']);
              } else if (err?.response?.status === 400) {
                alert('File name already exists.');
              }
              console.log(err);
            })
            .finally(() => (this.loading = false));
        } else {
          alert('Select a file');
        }
      } else {
        alert('Unauthorized');
        this.authenticationService.setAuthToken(null);
        this.router.navigate(['/auth']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.username$) {
      this.username$.unsubscribe();
    }
  }
}
