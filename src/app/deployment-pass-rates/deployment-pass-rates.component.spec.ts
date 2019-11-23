import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentPassRatesComponent } from './deployment-pass-rates.component';

describe('DeploymentPassRatesComponent', () => {
  let component: DeploymentPassRatesComponent;
  let fixture: ComponentFixture<DeploymentPassRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentPassRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentPassRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
