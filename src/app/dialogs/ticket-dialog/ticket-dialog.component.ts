import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TicketService, Ticket } from 'src/app/services/board/ticket.service';
import { UserSelectionDialogComponent } from '../user-selection-dialog/user-selection-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-ticket-dialog',
    templateUrl: './ticket-dialog.component.html',
    styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent {
    newTicket = false;
    ticket: Ticket;

    ticketForm: FormGroup;
    columnId: string;

    constructor(
        public dialogRef: MatDialogRef<TicketDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ticketService: TicketService,
        private dialog: MatDialog,
        private formBuilder: FormBuilder
    ) {
        this.newTicket = data.newTicket;
        this.ticket = data.ticket;
        this.columnId = data.columnId;

        this.ticketForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: [''],
            date: ['']
        });
    }

    close(result: number, returnTicket: Ticket) {
        this.dialogRef.close({ result, ticket: returnTicket });
    }

    addTicket() {
        const t: Ticket = {
            color: '#321321',
            title: this.ticketForm.getRawValue().title,
            description: this.ticketForm.getRawValue().description,
            column_id: this.columnId,
            date_due: new Date(this.ticketForm.getRawValue().date)
        };
        this.ticketService.addTicket(t).then(res => {
            this.close(1, res);
        });
    }

    assignUser() {
        const dialogRef = this.dialog.open(UserSelectionDialogComponent, {
            data: {
                newTicket: true
            },
            autoFocus: true
        });

        dialogRef.afterClosed().subscribe(result => {});
    }

    delete() {
        this.ticketService.deleteTicket(this.ticket.id).then((result: any) => {
            if (result.status === 'success') {
                this.close(-1, this.ticket);
            }
        });
    }
}
