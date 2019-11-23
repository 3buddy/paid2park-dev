import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassRatesComponent } from './edit-pass-rates.component';

describe('EditPassRatesComponent', () => {
  let component: EditPassRatesComponent;
  let fixture: ComponentFixture<EditPassRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPassRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
