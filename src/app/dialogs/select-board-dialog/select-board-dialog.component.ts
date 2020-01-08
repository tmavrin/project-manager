import { Component, Inject } from '@angular/core';
import { Board, BoardService } from 'src/app/services/board/board.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';

@Component({
    selector: 'app-select-board-dialog',
    templateUrl: './select-board-dialog.component.html',
    styleUrls: ['./select-board-dialog.component.scss']
})
export class SelectBoardDialogComponent {
    boards: Board[];

    constructor(
        public dialogRef: MatDialogRef<SelectBoardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private boardService: BoardService
    ) {
        this.dialogRef.disableClose = true;
        this.dialogRef.afterOpened().subscribe(() => {
            this.getBoards();
        });
    }

    getBoards() {
        this.boardService.getAllUserBoards().then((boards: Board[]) => {
            this.boards = boards;
        });
    }

    openCreateBoardDialog() {
        const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
            autoFocus: true
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getBoards();
        });
    }

    selectBoard(selectedBoard: Board) {
        this.dialogRef.close(selectedBoard.id);
    }

    deleteBoard(selectedBoard: Board) {
        this.boardService.deleteBoard(selectedBoard.id).then(() => {
            this.getBoards();
        });
    }
}
