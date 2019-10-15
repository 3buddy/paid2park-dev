import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnforcementsComponent } from './edit-enforcements.component';

describe('EditEnforcementsComponent', () => {
  let component: EditEnforcementsComponent;
  let fixture: ComponentFixture<EditEnforcementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnforcementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnforcementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
