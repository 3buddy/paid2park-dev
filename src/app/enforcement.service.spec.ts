import { TestBed } from '@angular/core/testing';

import { EnforcementService } from './enforcement.service';

describe('EnforcementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnforcementService = TestBed.get(EnforcementService);
    expect(service).toBeTruthy();
  });
});
