import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewDetailComponent } from './ticket-view-detail.component';

describe('TicketViewDetailComponent', () => {
  let component: TicketViewDetailComponent;
  let fixture: ComponentFixture<TicketViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
