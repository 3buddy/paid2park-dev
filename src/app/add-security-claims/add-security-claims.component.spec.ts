import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSecurityClaimsComponent } from './add-security-claims.component';

describe('AddSecurityClaimsComponent', () => {
  let component: AddSecurityClaimsComponent;
  let fixture: ComponentFixture<AddSecurityClaimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSecurityClaimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSecurityClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
