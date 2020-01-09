import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home.component';
import { ColumnComponent } from 'src/app/components/column/column.component';
import { TicketComponent } from 'src/app/components/ticket/ticket.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HomeComponent, ColumnComponent, TicketComponent],
    imports: [CommonModule, MatDialogModule, DragDropModule, RouterModule],
    exports: [MatDialogModule, ColumnComponent, TicketComponent]
})
export class HomeModule {}
