import { Component, OnInit } from '@angular/core';

import { Board, BoardService, Column } from './../../services/board/board.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from 'src/app/dialogs/create-board-dialog/create-board-dialog.component';
import { SelectBoardDialogComponent } from 'src/app/dialogs/select-board-dialog/select-board-dialog.component';
import { AuthService } from 'src/app/services/user/auth.service';
import { CreateColumnDialogComponent } from 'src/app/dialogs/create-column-dialog/create-column-dialog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    board: Board;

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
            this.board.columnList.push(result);
        });
    }
}
