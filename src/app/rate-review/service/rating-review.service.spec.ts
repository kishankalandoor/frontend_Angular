import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RatingReviewService } from './rating-review.service';

describe('RatingReviewService', () => {
  let service: RatingReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RatingReviewService]
    });
    service = TestBed.inject(RatingReviewService);
  });

  it('should be created', () => {
    // tslint:disable-next-line: deprecation
    const services: RatingReviewService = TestBed.get(RatingReviewService);
    expect(service).toBeTruthy();
  });
});
