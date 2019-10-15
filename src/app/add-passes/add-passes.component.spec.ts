import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassesComponent } from './add-passes.component';

describe('AddPassesComponent', () => {
  let component: AddPassesComponent;
  let fixture: ComponentFixture<AddPassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
