import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InquirieListService } from './inquirie-list.service';

describe('InquirieListService', () => {
  let service: InquirieListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InquirieListService]
    });
    service = TestBed.inject(InquirieListService);
  });

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const services: InquirieListService = TestBed.get(InquirieListService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    // tslint:disable-next-line: deprecation
    const services: InquirieListService = TestBed.get(InquirieListService);
    expect(service.getInquiriesList).toBeTruthy();
   });
});
