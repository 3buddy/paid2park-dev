import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecurityrolesComponent } from './edit-securityroles.component';

describe('EditSecurityrolesComponent', () => {
  let component: EditSecurityrolesComponent;
  let fixture: ComponentFixture<EditSecurityrolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSecurityrolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSecurityrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
