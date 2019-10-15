import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassRatesComponent } from './add-pass-rates.component';

describe('AddPassRatesComponent', () => {
  let component: AddPassRatesComponent;
  let fixture: ComponentFixture<AddPassRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPassRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPassRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
