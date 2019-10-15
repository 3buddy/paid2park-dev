import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKiosksComponent } from './add-kiosks.component';

describe('AddKiosksComponent', () => {
  let component: AddKiosksComponent;
  let fixture: ComponentFixture<AddKiosksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKiosksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKiosksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
