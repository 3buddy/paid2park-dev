import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiclesComponent } from './edit-vehicles.component';

describe('EditVehiclesComponent', () => {
  let component: EditVehiclesComponent;
  let fixture: ComponentFixture<EditVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
