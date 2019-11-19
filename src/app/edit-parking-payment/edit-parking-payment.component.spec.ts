import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParkingPaymentComponent } from './edit-parking-payment.component';

describe('EditParkingPaymentComponent', () => {
  let component: EditParkingPaymentComponent;
  let fixture: ComponentFixture<EditParkingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParkingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParkingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
