import { Component, OnInit } from '@angular/core';

import { Board, BoardService, Column } from './../../services/board/board.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from 'src/app/dialogs/create-board-dialog/create-board-dialog.component';
import { SelectBoardDialogComponent } from 'src/app/dialogs/select-board-dialog/select-board-dialog.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { CreateColumnDialogComponent } from 'src/app/dialogs/create-column-dialog/create-column-dialog.component';
import { UserSelectionDialogComponent } from 'src/app/dialogs/user-selection-dialog/user-selection-dialog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    board: Board;

    editMode = false;

    constructor(private auth: AuthService, private boardService: BoardService, private dialog: MatDialog) {}

    ngOnInit() {
        this.openSelectBoardDialog();
    }

    openSelectBoardDialog() {
        const dialogRef = this.dialog.open(SelectBoardDialogComponent, {
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getBoard(result);
        });
    }

    getBoard(boardId: string) {
        this.boardService.getBoard(boardId).then((board: Board) => {
            this.board = board;
        });
    }

    logOut() {
        this.auth.logOut();
    }

    createColumnDialog() {
        const dialogRef = this.dialog.open(CreateColumnDialogComponent, {
            autoFocus: true,
            data: { boardId: this.board.id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.board.columnList.push(result);
            }
        });
    }

    editColumns() {
        this.editMode = !this.editMode;
    }

    deleteColumn(delColumn: Column) {
        const index = this.board.columnList.indexOf(delColumn);
        this.board.columnList.splice(index, 1);
    }

    editBoardInfo() {}

    showBoardMembers() {
        const dialogRef = this.dialog.open(UserSelectionDialogComponent, {
            data: {
                boardId: this.board.id,
                editMode: true
            }
        });
    }
}
