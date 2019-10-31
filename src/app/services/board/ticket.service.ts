import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serverConfig } from './../../config';
import { User } from './../user/auth.service';

const ticket1: Ticket = {
  title: 'test title',
  subtitle: 'test subtitle',
  dateCreated: new Date(),
  createdBy: {
    uid: 'user_uid',
    name: 'username',
    email: 'email'
  }
};
const ticket2: Ticket = {
  title: 'test title2',
  subtitle: 'test subtitle2',
  dateCreated: new Date(),
  createdBy: {
    uid: 'user_uid',
    name: 'username',
    email: 'email'
  }
};
const ticket3: Ticket = {
  title: 'test title3',
  subtitle: 'test subtitle3',
  dateCreated: new Date(),
  createdBy: {
    uid: 'user_uid',
    name: 'username',
    email: 'email'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  public getMockColumnTickets() {
    return [ticket1, ticket2, ticket3];
  }
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
