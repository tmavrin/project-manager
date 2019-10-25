import { serverConfig } from './../../config';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginHeaders: HttpHeaders = new HttpHeaders();
    loginHeaders.append('Content-Type', 'application/json');
    loginHeaders.append('Authorization', 'Basic ' + btoa(email + ':' + password));

    this.http.post(serverConfig.apiAddress + '/login', {}, { headers: loginHeaders });
  }
}
