import { TestBed } from '@angular/core/testing';

import { BaseAuthInterceptor } from './base-auth.interceptor';

describe('BaseAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BaseAuthInterceptor = TestBed.inject(BaseAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
