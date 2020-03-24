import { TestBed } from '@angular/core/testing';

import { PitchingService } from './pitching-query.service';

describe('PitchingService', () => {
  let service: PitchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PitchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
