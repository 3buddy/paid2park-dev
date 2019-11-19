import { TestBed } from '@angular/core/testing';

import { PassesService } from './passes.service';

describe('PassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassesService = TestBed.get(PassesService);
    expect(service).toBeTruthy();
  });
});
