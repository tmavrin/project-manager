import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serverConfig } from './../../config';

import { Board } from './board.service';
import { Ticket, TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient, private ticketService: TicketService) {}

  public getBoard(boardId: string): Promise<Board> {
    return new Promise((resolve, reject) => {
      this.http
        .get(serverConfig.apiAddress + '/user/board')
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

  public getMockBoard(): Promise<Board> {
    const column1: Column = {
      name: 'Column Title 1',
      tickets: this.ticketService.getMockColumnTickets()
    };

    const column2: Column = {
      name: 'Column Title 2',
      tickets: this.ticketService.getMockColumnTickets()
    };

    const column3: Column = {
      name: 'Column Title 3',
      tickets: this.ticketService.getMockColumnTickets()
    };

    const column4: Column = {
      name: 'Column Title 4',
      tickets: this.ticketService.getMockColumnTickets()
    };

    const column5: Column = {
      name: 'Column Title 5',
      tickets: this.ticketService.getMockColumnTickets()
    };

    const mockBoard: Board = {
      name: 'Board Title',
      columns: [column1, column2, column3, column4, column5]
    };

    return new Promise<Board>((resolve, reject) => {
      resolve(mockBoard);
    });
  }
}

export interface Column {
  name: string;
  tickets: Ticket[];
}

export interface Board {
  name: string;
  columns: Column[];
}
