import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { serverConfig } from './../../config';

import { BoardService, Board, Column } from './board.service';
import { TicketService } from './ticket.service';

fdescribe('TicketService', () => {
    let httpTestingController: HttpTestingController;
    let boardService: BoardService;
    let ticketService: TicketService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BoardService, TicketService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        boardService = TestBed.get(BoardService);
        ticketService = TestBed.get(TicketService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(boardService).toBeTruthy();
    });
});
