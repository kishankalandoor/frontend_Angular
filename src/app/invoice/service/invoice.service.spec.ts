import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvoiceService]
    });
    service = TestBed.inject(InvoiceService);
  });

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const services: InvoiceService = TestBed.get(InvoiceService);
    expect(service).toBeTruthy();
  });
});
