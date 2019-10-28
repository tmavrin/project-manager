import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './../../components/column/column.component';
import { TicketComponent } from './../../components/ticket/ticket.component';

@NgModule({
  declarations: [ColumnComponent, TicketComponent],
  imports: [CommonModule],
  exports: [TicketComponent]
})
export class HomeModule {}
