import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serverConfig } from './../../config';
import { User } from './../user/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    constructor(private http: HttpClient) {}

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

    public addTicket(ticket: Ticket): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http
                .post(serverConfig.apiAddress + '/ticket/create', ticket)
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

    public mockAssignUserToTicket(ticketId: string, userId: string) {
        return true;
    }

    public assignUserToTicket(ticketId: string, userId: string) {
        return new Promise((resolve, reject) => {
            this.http
                .post(serverConfig.apiAddress + '/ticket/assignUser', {
                    ticketId,
                    userId
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

    public moveTicket(ticket: Ticket): Promise<any> {
        return this.http.post(serverConfig.apiAddress + '/ticket/move', ticket).toPromise();
    }

    public deleteTicket(ticketId: string) {
        return this.http.post(serverConfig.apiAddress + '/ticket/delete?ticketId=' + ticketId, {}).toPromise();
    }
}

export interface Ticket {
    id?: string;
    subtitle?: string;
    column_id: string;
    title: string;
    description?: string;
    color: string;
    date_due?: Date;
    assigned_to?: string;
    createdBy?: string;
}
