import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LandingDashboardService } from './landing-dashboard.service';

describe('LandingDashboardService', () => {
  let service: LandingDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LandingDashboardService]
    });
    service = TestBed.inject(LandingDashboardService);
  });

  it('should be created', () => {
    const services: LandingDashboardService = TestBed.get(LandingDashboardService);
    expect(service).toBeTruthy();
  });
});
