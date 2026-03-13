import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MasterService } from './master.service';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MasterService]
    });
    service = TestBed.inject(MasterService);
  });

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const services: MasterService = TestBed.get(MasterService);
    expect(service).toBeTruthy();
  });
});
