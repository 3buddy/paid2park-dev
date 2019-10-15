import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKiosksComponent } from './edit-kiosks.component';

describe('EditKiosksComponent', () => {
  let component: EditKiosksComponent;
  let fixture: ComponentFixture<EditKiosksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKiosksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKiosksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
