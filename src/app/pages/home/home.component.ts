import { Component, OnInit } from '@angular/core';

import { Board, BoardService } from './../../services/board/board.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  board: Board;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.boardService.getMockBoard().then(result => {
      this.board = result;
      console.log(this.board);
    });
  }
}
