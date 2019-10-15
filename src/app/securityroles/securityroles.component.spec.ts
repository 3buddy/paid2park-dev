import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityrolesComponent } from './securityroles.component';

describe('SecurityrolesComponent', () => {
  let component: SecurityrolesComponent;
  let fixture: ComponentFixture<SecurityrolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityrolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
