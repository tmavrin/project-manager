import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { serverConfig } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string) {
    const loginHeaders = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(email + ':' + password)
    };

    console.log(loginHeaders);

    this.http
      .post(serverConfig.apiAddress + '/login', {}, { headers: loginHeaders })
      .toPromise()
      .then(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
