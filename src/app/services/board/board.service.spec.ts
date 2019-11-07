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

  it('should return array of tickets', () => {
    const column1: Column = {
      name: 'Column Title 1',
      tickets: ticketService.getMockColumnTickets()
    };

    const column2: Column = {
      name: 'Column Title 2',
      tickets: ticketService.getMockColumnTickets()
    };

    const column3: Column = {
      name: 'Column Title 3',
      tickets: ticketService.getMockColumnTickets()
    };

    const column4: Column = {
      name: 'Column Title 4',
      tickets: ticketService.getMockColumnTickets()
    };

    const column5: Column = {
      name: 'Column Title 5',
      tickets: ticketService.getMockColumnTickets()
    };

    const mockBoard: Board = {
      name: 'Board Title',
      columns: [column1, column2, column3, column4, column5]
    };

    boardService.getBoard('random_id').then(tickets => {
      console.log(tickets);
      expect(tickets).toBeTruthy();
    });

    const req = httpTestingController.expectOne(serverConfig.apiAddress + '/user/board');

    expect(req.request.method).toEqual('GET');

    req.flush(mockBoard);
  });
});
