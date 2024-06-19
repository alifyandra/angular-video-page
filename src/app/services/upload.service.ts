import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private axiosService: AxiosService) {}

  public uploadFile(file: File, token: string): Promise<any> {
    const formParams = new FormData();
    formParams.append('file', file);
    formParams.append('username', 'alif');

    return this.axiosService.uploadFile(formParams, token);
  }

  public getAllUploads(token: string): Promise<any> {
    return this.axiosService.get('/uploads', { all: true }, token);
  }
}
