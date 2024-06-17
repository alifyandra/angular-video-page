import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private axiosService: AxiosService) {}

  public uploadFile(file: File): Promise<any> {
    const formParams = new FormData();
    formParams.append('file', file);
    formParams.append('username', 'alif');
    formParams.append('token', 'abc123');

    return this.axiosService.uploadFile(formParams);
  }
}
