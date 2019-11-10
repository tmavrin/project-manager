import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/board/ticket.service';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketService
  ) {}

  close() {
    this.dialogRef.close();
  }

  addTicket() {
    this.ticketService.addMockTicket('boardId', 'columnId');
  }
}
