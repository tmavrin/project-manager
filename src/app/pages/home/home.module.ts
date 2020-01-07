import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './../../components/column/column.component';
import { TicketComponent } from './../../components/ticket/ticket.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [ColumnComponent, TicketComponent, MatDialogModule],
    imports: [CommonModule],
    exports: [TicketComponent, DragDropModule, MatDialogModule]
})
export class HomeModule {}
