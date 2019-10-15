import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketPaymentComponent } from './add-ticket-payment.component';

describe('AddTicketPaymentComponent', () => {
  let component: AddTicketPaymentComponent;
  let fixture: ComponentFixture<AddTicketPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTicketPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTicketPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
