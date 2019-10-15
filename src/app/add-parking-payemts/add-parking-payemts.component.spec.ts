import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParkingPayemtsComponent } from './add-parking-payemts.component';

describe('AddParkingPayemtsComponent', () => {
  let component: AddParkingPayemtsComponent;
  let fixture: ComponentFixture<AddParkingPayemtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParkingPayemtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParkingPayemtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
