import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecurityRoleComponent } from './add-security-role.component';

describe('AddSecurityRoleComponent', () => {
  let component: AddSecurityRoleComponent;
  let fixture: ComponentFixture<AddSecurityRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSecurityRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSecurityRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
