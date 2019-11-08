import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { Column } from './../../services/board/board.service';
import { TicketService, Ticket } from './../../services/board/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { NewTicketDialogComponent } from '../new-ticket-dialog/new-ticket-dialog.component';

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

  drop(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addTicket() {
    const dialogRef = this.dialog.open(NewTicketDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
