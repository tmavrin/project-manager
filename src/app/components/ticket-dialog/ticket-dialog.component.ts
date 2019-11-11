import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService, Ticket } from 'src/app/services/board/ticket.service';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent {
  newTicket = false;
  ticket: Ticket;

  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService
  ) {
    this.newTicket = data.newTicket;
    this.ticket = data.ticket;
  }

  close() {
    this.dialogRef.close();
  }

  addTicket() {
    this.ticketService.addMockTicket('boardId', 'columnId');
  }

  assignUser() {
    this.ticketService.assignUserToTicket('ticketId', 'userId');
  }
}