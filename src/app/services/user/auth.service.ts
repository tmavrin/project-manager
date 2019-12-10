import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEventType } from '@angular/common/http';

import { serverConfig } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authHeaders;

  public isAuthenticated;

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
              this.isAuthenticated = false;
              reject('Invalid login info. No user with credentials found');
            } else {
              this.isAuthenticated = true;
              resolve(data.response);
            }
          },
          (error: HttpErrorResponse) => {
            this.isAuthenticated = false;
            reject(error);
          }
        );
    });
  }

  public register(email: string, password: string, name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(serverConfig.apiAddress + '/register', {id: '', name, email, password})
        .toPromise()
        .then(
          (data: any) => {
            console.log(data);
            if (data.status === 'failure') {
              reject('User aleready exists!');
            } else {
              resolve(data.response);
            }
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            reject(error);
          }
        );
    });
  }
}

export interface User {
  uid: string;
  name: string;
  email: string;
  boardIds?: string[];
}
