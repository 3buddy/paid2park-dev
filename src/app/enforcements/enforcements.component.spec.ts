import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforcementsComponent } from './enforcements.component';

describe('EnforcementsComponent', () => {
  let component: EnforcementsComponent;
  let fixture: ComponentFixture<EnforcementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnforcementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnforcementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
