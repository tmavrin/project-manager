import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { serverConfig } from './../../config';

import { TicketService, Ticket } from './ticket.service';

fdescribe('TicketService', () => {
  let httpTestingController: HttpTestingController;
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TicketService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of tickets', () => {
    const ticket1: Ticket = {
      title: 'test title',
      subtitle: 'test subtitle',
      dateCreated: new Date(),
      createdBy: {
        uid: 'user_uid',
        name: 'username',
        email: 'email'
      }
    };
    const ticket2: Ticket = {
      title: 'test title2',
      subtitle: 'test subtitle2',
      dateCreated: new Date(),
      createdBy: {
        uid: 'user_uid',
        name: 'username',
        email: 'email'
      }
    };
    const ticket3: Ticket = {
      title: 'test title3',
      subtitle: 'test subtitle3',
      dateCreated: new Date(),
      createdBy: {
        uid: 'user_uid',
        name: 'username',
        email: 'email'
      }
    };

    const mockTickets = { ticket1, ticket2, ticket3 };

    service.getColumnTickets('test_id').then(tickets => {
      console.log(tickets);
      expect(tickets).toBeTruthy();
    });

    const req = httpTestingController.expectOne(serverConfig.apiAddress);

    expect(req.request.method).toEqual('GET');

    req.flush(mockTickets);
  });
});
