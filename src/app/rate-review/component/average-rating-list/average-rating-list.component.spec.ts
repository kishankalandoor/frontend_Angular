import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageRatingListComponent } from './average-rating-list.component';

describe('AverageRatingListComponent', () => {
  let component: AverageRatingListComponent;
  let fixture: ComponentFixture<AverageRatingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageRatingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
