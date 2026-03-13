import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquirieListComponent } from './inquirie-list.component';

describe('InquirieListComponent', () => {
  let component: InquirieListComponent;
  let fixture: ComponentFixture<InquirieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquirieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquirieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
