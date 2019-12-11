import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serverConfig } from './../../config';

import { Board } from './board.service';
import { Ticket, TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient, private ticketService: TicketService) { }

  public getAllUserBoards(): Promise<Board[]> {
    return new Promise<Board[]>((resolve, reject) => {
      this.http.get<Board[]>(serverConfig.apiAddress + '/user/boards').toPromise().then((boards: Board[]) => {
        resolve(boards);
      });
    });
  }

  public getBoard(boardId: string): Promise<Board> {
    return new Promise((resolve, reject) => {
      this.http
        .get(serverConfig.apiAddress + '/user/board?boardId=' + boardId)
        .toPromise()
        .then(
          response => {
            resolve(response as Board);
          },
          error => {
            console.log(error);
            reject(error);
          }
        );
    });
  }

  public createBoard(name: string, description: string) {
    return new Promise((resolve, reject) => {
      this.http.post(serverConfig.apiAddress + '/user/create_board', { name, description }).toPromise().then((data: any) => {
        if (data.status === 'failure') {
          reject();
        } else {
          resolve();
        }
      });
    });
  }
}

export interface Column {
  id: string;
  name: string;
  tickets: Ticket[];
}

export interface Board {
  id: string;
  name: string;
  description: string;
  columnList: Column[];
}
