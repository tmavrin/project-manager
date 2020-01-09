import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serverConfig } from './../../config';

import { Ticket, TicketService } from './ticket.service';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    constructor(private http: HttpClient, private ticketService: TicketService) {}
    public getAllUserBoards(): Promise<Board[]> {
        return new Promise<Board[]>((resolve, reject) => {
            this.http
                .get<Board[]>(serverConfig.apiAddress + '/user/boards')
                .toPromise()
                .then((boards: Board[]) => {
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
                        console.error(error);
                        reject(error);
                    }
                );
        });
    }

    public createBoard(name: string, description: string) {
        return new Promise((resolve, reject) => {
            this.http
                .post(serverConfig.apiAddress + '/board/create', {
                    name,
                    description
                })
                .toPromise()
                .then((data: any) => {
                    if (data.status === 'failure') {
                        reject(data);
                    } else {
                        resolve();
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }

    deleteBoard(boardId: string) {
        return new Promise((resolve, reject) => {
            this.http
                .post(serverConfig.apiAddress + '/board/delete?boardId=' + boardId, {})
                .toPromise()
                .then(result => {
                    resolve();
                });
        });
    }

    createColumn(column: Column) {
        return new Promise((resolve, reject) => {
            this.http
                .post(serverConfig.apiAddress + '/column/create', column)
                .toPromise()
                .then((response: Column) => {
                    response.tickets = [];
                    resolve(response);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    deleteColumn(column: Column) {
        return new Promise((resolve, reject) => {
            this.http
                .post(serverConfig.apiAddress + '/column/delete?columnId=' + column.id, {})
                .toPromise()
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    console.error(err);
                });
        });
    }

    getBoardsUsers(boardId: string) {
        return this.http.post(serverConfig.apiAddress + '/board/users?boardId=' + boardId, {}).toPromise();
    }

    addUserToBoard(userEmail: string, boardId: string) {
        return this.http.post(serverConfig.apiAddress + '/board/users/add?email=' + userEmail + '&boardId=' + boardId, {}).toPromise();
    }

    removeUser(userId: string, boardId: string) {
        return this.http.post(serverConfig.apiAddress + '/board/users/remove?userId=' + userId + '&boardId=' + boardId, {}).toPromise();
    }
}

export interface Column {
    id?: string;
    name: string;
    tickets?: Ticket[];
    board_id: string;
}

export interface Board {
    id: string;
    name: string;
    owner_id: string;
    description: string;
    columnList: Column[];
}
