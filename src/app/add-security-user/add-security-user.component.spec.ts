import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecurityUserComponent } from './add-security-user.component';

describe('AddSecurityUserComponent', () => {
  let component: AddSecurityUserComponent;
  let fixture: ComponentFixture<AddSecurityUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSecurityUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSecurityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
