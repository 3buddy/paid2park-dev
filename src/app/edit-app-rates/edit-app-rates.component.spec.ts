import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppRatesComponent } from './edit-app-rates.component';

describe('EditAppRatesComponent', () => {
  let component: EditAppRatesComponent;
  let fixture: ComponentFixture<EditAppRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAppRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
