import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppRatesComponent } from './add-app-rates.component';

describe('AddAppRatesComponent', () => {
  let component: AddAppRatesComponent;
  let fixture: ComponentFixture<AddAppRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
