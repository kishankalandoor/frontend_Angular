import { TestBed } from '@angular/core/testing';

import { CustomePaginationService } from './custome-pagination.service';

describe('CustomePaginationService', () => {
  let service: CustomePaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomePaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
