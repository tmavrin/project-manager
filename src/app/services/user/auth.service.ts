import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { serverConfig } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authHeaders;

  constructor(private http: HttpClient) {}

  public getAuthHeaders() {
    return this.authHeaders;
  }

  public login(email: string, password: string): Promise<any> {
    this.authHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(email + ':' + password)
    };

    return new Promise((resolve, reject) => {
      this.http
        .post(serverConfig.apiAddress + '/login', {})
        .toPromise()
        .then(
          (data: any) => {
            if (data.status === 'failure') {
              reject('Invalid login info. No user with credentials found');
            } else {
              resolve(data.response);
            }
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }
}
