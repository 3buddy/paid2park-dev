import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityclaimsComponent } from './securityclaims.component';

describe('SecurityclaimsComponent', () => {
  let component: SecurityclaimsComponent;
  let fixture: ComponentFixture<SecurityclaimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityclaimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
