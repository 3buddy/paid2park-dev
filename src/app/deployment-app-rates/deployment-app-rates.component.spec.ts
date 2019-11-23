import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentAppRatesComponent } from './deployment-app-rates.component';

describe('DeploymentAppRatesComponent', () => {
  let component: DeploymentAppRatesComponent;
  let fixture: ComponentFixture<DeploymentAppRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentAppRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentAppRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
