import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSecurityusersComponent } from './edit-securityusers.component';

describe('EditSecurityusersComponent', () => {
  let component: EditSecurityusersComponent;
  let fixture: ComponentFixture<EditSecurityusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSecurityusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSecurityusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
