import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });
    service = TestBed.inject(TicketService);
  });

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const services: TicketService = TestBed.get(TicketService);
    expect(service).toBeTruthy();
  });
});
