import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ticket } from './../../services/board/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @Input('ticket') ticket: Ticket;
  @Output() deleteTicket = new EventEmitter<Ticket>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  editTicket() {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      data: {
        newTicket: false,
        ticket: this.ticket
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.result === -1) {
        this.deleteTicket.emit(this.ticket);
      }
    });
  }
}
