import { Component, OnInit, Inject } from '@angular/core';
import { User, AuthService } from 'src/app/services/user/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { TicketService } from 'src/app/services/board/ticket.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
    selector: 'app-user-selection-dialog',
    templateUrl: './user-selection-dialog.component.html',
    styleUrls: ['./user-selection-dialog.component.scss']
})
export class UserSelectionDialogComponent implements OnInit {
    users: User[];
    constructor(
        public dialogRef: MatDialogRef<UserSelectionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public authService: AuthService,
        private boardService: BoardService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        if (this.data.nonUser) {
            this.getNonBoardUsers();
        } else {
            this.getBoardUsers();
        }
    }

    private getBoardUsers() {
        this.boardService.getBoardsUsers(this.data.boardId).then((users: User[]) => {
            this.users = users;
        });
    }

    private getNonBoardUsers() {
        this.boardService.getNonBoardsUsers(this.data.boardId).then((users: User[]) => {
            this.users = users;
        });
    }

    assignUser(userId: string) {
        if (!this.data.nonUser) {
            this.dialogRef.close(userId);
        } else {
            this.addUser(userId);
        }
    }

    deleteUser(userId: string) {
        this.boardService.removeUser(userId, this.data.boardId).then(() => {
            this.getBoardUsers();
        });
    }

    addUser(userId: string) {
        this.boardService.addUserToBoard(userId, this.data.boardId).then((result: any) => {
            if (result.status === 'success') {
                this.dialogRef.close();
            }
        });
    }

    addUserDialog() {
        const dialogRef = this.dialog.open(UserSelectionDialogComponent, {
            data: {
                boardId: this.data.boardId,
                editMode: false,
                nonUser: true
            },
            autoFocus: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getBoardUsers();
        });
    }
}
