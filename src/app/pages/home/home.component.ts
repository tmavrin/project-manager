import { Component, OnInit } from '@angular/core';

import { Board, BoardService, Column } from './../../services/board/board.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from 'src/app/components/create-board-dialog/create-board-dialog.component';
import { SelectBoardDialogComponent } from 'src/app/components/select-board-dialog/select-board-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  board: Board;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit() {
    // this.boardService.getMockBoard().then(result => {
    //  this.board = result;
    //  console.log(this.board);
    // });
    this.getBoards();
  }

  openCreateBoardDialog() {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBoards();
    });
  }

  getBoards() {
    this.boardService.getAllUserBoards().then((boards: Board[]) => {
      if (boards.length === 0) {
        this.openCreateBoardDialog();
      } else if (boards.length === 1) {
        this.getBoard(boards[0].id);
      } else {
        this.selectBoard();
      }
    });
  }

  selectBoard() {
    const dialogRef = this.dialog.open(SelectBoardDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBoard(result.boardId);
    });
  }

  getBoard(boardId: string) {
    this.boardService.getBoard(boardId).then((board: Board) => {
      this.board = board;
      console.log(board);
    });
  }
}
