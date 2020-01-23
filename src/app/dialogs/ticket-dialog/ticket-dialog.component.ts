import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TicketService, Ticket } from 'src/app/services/board/ticket.service';
import { UserSelectionDialogComponent } from '../user-selection-dialog/user-selection-dialog.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/services/user/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-ticket-dialog',
    templateUrl: './ticket-dialog.component.html',
    styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent {
    colors: Color[] = [
        { value: '#C4C4C4', text: 'Grey' },
        { value: '#EE8282', text: 'Red' },
        { value: '#D3C64E', text: 'Yellow' },
        { value: '#59C05D', text: 'Green' },
        { value: '#49E9D5', text: 'Light Blue' },
        { value: '#71A1EA', text: 'Dark Blue' },
        { value: '#E9BEF3', text: 'Pink' },
        { value: '#C295FD', text: 'Purple' }
    ];

    selectedColor = '#C4C4C4';

    newTicket = false;
    ticket: Ticket;

    ticketForm: FormGroup;
    columnId: string;

    assignedUser: string;
    assignedUserName = '';

    constructor(
        public dialogRef: MatDialogRef<TicketDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ticketService: TicketService,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.newTicket = data.newTicket;
        this.ticket = data.ticket;
        this.columnId = data.columnId;

        if (!data.newTicket && this.ticket) {
            this.selectedColor = this.ticket.color;
            this.getAssignedUser(this.ticket.assigned_to);
        }
        this.ticketForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: [''],
            subtitle: ['', Validators.required],
            date: ['']
        });

        if (!this.newTicket) {
            this.ticketForm.disable();
        }
    }

    close(result: number, returnTicket: Ticket) {
        this.dialogRef.close({ result, ticket: returnTicket });
    }

    addTicket() {
        if (this.ticketForm.valid) {
            const t: Ticket = {
                color: this.selectedColor,
                title: this.ticketForm.getRawValue().title,
                subtitle: this.ticketForm.getRawValue().subtitle,
                description: this.ticketForm.getRawValue().description,
                column_id: this.columnId,
                date_due: new Date(this.ticketForm.getRawValue().date),
                assigned_to: this.assignedUser
            };
            this.ticketService.addTicket(t).then(res => {
                this.close(1, res);
            });
        } else {
            const snack = this.snackBar.open('Invalid form input. Please fill out at least title and subtitle.');
            setTimeout(() => {
                snack.dismiss();
            }, 3500);
        }
    }

    assignUser() {
        const dialogRef = this.dialog.open(UserSelectionDialogComponent, {
            data: {
                boardId: this.data.boardId,
                editMode: false,
                nonUser: false
            },
            autoFocus: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.assignedUser = result;
                this.getAssignedUser(result);
            }
        });
    }

    getAssignedUser(id: string) {
        if (id) {
            this.ticketService.getAssignedUser(id).then((user: User) => {
                this.assignedUserName = user.name;
            });
        }
    }

    delete() {
        this.ticketService.deleteTicket(this.ticket.id).then((result: any) => {
            if (result.status === 'success') {
                this.close(-1, this.ticket);
            }
        });
    }
}

export interface Color {
    value: string;
    text: string;
}
