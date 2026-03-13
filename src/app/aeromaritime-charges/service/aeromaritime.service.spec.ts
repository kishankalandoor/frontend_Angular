import { TestBed } from '@angular/core/testing';

import { AeromaritimeService } from './aeromaritime.service';

describe('AeromaritimeService', () => {
  let service: AeromaritimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeromaritimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
