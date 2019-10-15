import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnforcementsComponent } from './add-enforcements.component';

describe('AddEnforcementsComponent', () => {
  let component: AddEnforcementsComponent;
  let fixture: ComponentFixture<AddEnforcementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEnforcementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnforcementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
