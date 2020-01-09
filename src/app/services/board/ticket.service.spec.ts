import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { serverConfig } from './../../config';

import { TicketService, Ticket } from './ticket.service';

describe('TicketService', () => {
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
});
