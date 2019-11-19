import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassesComponent } from './edit-passes.component';

describe('EditPassesComponent', () => {
  let component: EditPassesComponent;
  let fixture: ComponentFixture<EditPassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
