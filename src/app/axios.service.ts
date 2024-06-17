import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  public uploadFile(data: any): Promise<any> {
    return axios({
      method: 'post',
      url: '/upload',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
