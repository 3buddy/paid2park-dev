import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityusersComponent } from './securityusers.component';

describe('SecurityusersComponent', () => {
  let component: SecurityusersComponent;
  let fixture: ComponentFixture<SecurityusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
