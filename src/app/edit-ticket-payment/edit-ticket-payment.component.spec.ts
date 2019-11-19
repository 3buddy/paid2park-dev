import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketPaymentComponent } from './edit-ticket-payment.component';

describe('EditTicketPaymentComponent', () => {
  let component: EditTicketPaymentComponent;
  let fixture: ComponentFixture<EditTicketPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTicketPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTicketPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
