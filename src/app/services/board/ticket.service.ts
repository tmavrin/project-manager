import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serverConfig } from './../../config';
import { User } from './../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  public getColumnTickets(columnUid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(serverConfig.apiAddress)
        .toPromise()
        .then(
          response => {
            resolve(response);
          },
          error => {
            console.log(error);
            reject(error);
          }
        );
    });
  }
}

export interface Ticket {
  title: string;
  subtitle: string;
  comments?: Comment[];
  dateCreated: Date;
  deadline?: Date;
  assigned?: User;
  createdBy: User;
}

export interface Comment {
  authorId: string;
  content: string;
  timestamp: Date;
}
