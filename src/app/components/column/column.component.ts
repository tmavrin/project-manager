import { Component, OnInit, Input } from '@angular/core';
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem
} from '@angular/cdk/drag-drop';

import { Column } from './../../services/board/board.service';
import { TicketService, Ticket } from './../../services/board/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
    @Input('column') column: Column;

    constructor(
        private ticketService: TicketService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {}

    async drop(event: CdkDragDrop<Ticket[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            const movedTicket: Ticket =
                event.previousContainer.data[event.previousIndex];
            movedTicket.column_id = this.column.id;
            await this.ticketService.moveTicket(movedTicket).then(() => {
                transferArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex
                );
            });
        }
    }

    addTicket() {
        const dialogRef = this.dialog.open(TicketDialogComponent, {
            data: {
                newTicket: true,
                columnId: this.column.id
            },
            autoFocus: true
        });

        dialogRef
            .afterClosed()
            .subscribe((resultTicket: { result; ticket }) => {
                console.log(resultTicket);
                if (resultTicket.result === 1) {
                    this.column.tickets.push(resultTicket.ticket);
                }
            });
    }

    deleteTicket(delTicket: Ticket) {
        const index = this.column.tickets.indexOf(delTicket);
        this.column.tickets.splice(index, 1);
    }
}
