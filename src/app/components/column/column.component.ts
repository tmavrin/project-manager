import { Component, OnInit } from '@angular/core';

import { TicketService } from './../../services/board/ticket.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  public tickets;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.tickets = this.ticketService.getMockColumnTickets();
  }
}
