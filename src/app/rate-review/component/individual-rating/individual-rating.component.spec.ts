import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRatingComponent } from './individual-rating.component';

describe('IndividualRatingComponent', () => {
  let component: IndividualRatingComponent;
  let fixture: ComponentFixture<IndividualRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
