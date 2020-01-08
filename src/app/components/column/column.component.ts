import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Column, BoardService } from './../../services/board/board.service';
import { TicketService, Ticket } from './../../services/board/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../../dialogs/ticket-dialog/ticket-dialog.component';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
    @Input('column') column: Column;
    @Input('edit') edit: boolean;
    @Output() delete = new EventEmitter<Column>();

    constructor(private ticketService: TicketService, private dialog: MatDialog, private boardService: BoardService) {}

    ngOnInit() {}

    async drop(event: CdkDragDrop<Ticket[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            const movedTicket: Ticket = event.previousContainer.data[event.previousIndex];
            movedTicket.column_id = this.column.id;
            await this.ticketService.moveTicket(movedTicket).then(() => {
                transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
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

        dialogRef.afterClosed().subscribe((resultTicket: { result; ticket }) => {
            if (resultTicket) {
                if (resultTicket.result === 1) {
                    this.column.tickets.push(resultTicket.ticket);
                }
            }
        });
    }

    deleteTicket(delTicket: Ticket) {
        const index = this.column.tickets.indexOf(delTicket);
        this.column.tickets.splice(index, 1);
    }

    deleteColumn() {
        this.boardService.deleteColumn(this.column).then(() => {
            this.delete.emit(this.column);
        });
    }
}
