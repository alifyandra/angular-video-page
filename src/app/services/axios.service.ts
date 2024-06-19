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

  public uploadFile(data: FormData, token: string): Promise<any> {
    return axios({
      method: 'post',
      url: '/upload',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    });
  }

  public post(url: string, data: any, token?: string): Promise<any> {
    return axios.post(url, data, { headers: { Authorization: token } });
  }

  public get(url: string, params: any, token: string): Promise<any> {
    return axios.get(url, {
      params: params,
      headers: { Authorization: token },
    });
  }
}
