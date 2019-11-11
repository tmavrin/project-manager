import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serverConfig } from './../../config';
import { User } from './../user/auth.service';

const ticket1: Ticket = {
  title: 'test title',
  subtitle: 'test subtitle',
  dateCreated: new Date(),
  createdBy: {
    uid: 'user_uid1',
    name: 'username1',
    email: 'email1'
  },
  description: 'Some test1 description',
  deadline: new Date()
};
const ticket2: Ticket = {
  title: 'test title2',
  subtitle: 'test subtitle2',
  dateCreated: new Date(),
  createdBy: {
    uid: 'user_uid2',
    name: 'username2',
    email: 'email2'
  },
  description: 'Some test2 description',
  assigned: { uid: 'user_uid2', name: 'username2', email: 'email2' }
};
const ticket3: Ticket = {
  title: 'test title3',
  subtitle: 'test subtitle3',
  dateCreated: new Date(),
  createdBy: {
    uid: 'user_uid3',
    name: 'username3',
    email: 'email3'
  },
  description: 'Some test3 description'
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  public getMockColumnTickets() {
    return [ticket1, ticket2, ticket3];
  }
  public getColumnTickets(columnId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(serverConfig.apiAddress + '/column')
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

  public addMockTicket(boardId: string, columnId: string) {
    return true;
  }

  public addTicket(boardId: string, columnId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(serverConfig.apiAddress + '/column/addTicket', {
          boardId,
          columnId
        })
        .toPromise()
        .then(
          response => {
            resolve(response);
          },
          error => {
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
  description?: string;
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
