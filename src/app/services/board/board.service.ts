import { Injectable } from '@angular/core';

import { Ticket } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor() {}
}

export interface Column {
  name: string;
  tickets: Ticket[];
}

export interface Board {
  name: string;
  columns: Column;
}
