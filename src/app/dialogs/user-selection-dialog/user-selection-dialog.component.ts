import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/services/user/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { TicketService } from 'src/app/services/board/ticket.service';

@Component({
    selector: 'app-user-selection-dialog',
    templateUrl: './user-selection-dialog.component.html',
    styleUrls: ['./user-selection-dialog.component.scss']
})
export class UserSelectionDialogComponent implements OnInit {
    users: User[];
    constructor(public dialogRef: MatDialogRef<UserSelectionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private boardService: BoardService) {}

    ngOnInit() {
        this.boardService.getBoardsUsers(this.data.boardId).then((users: User[]) => {
            this.users = users;
        });
    }

    assignUser(userId: string) {
        this.dialogRef.close(userId);
    }
}
