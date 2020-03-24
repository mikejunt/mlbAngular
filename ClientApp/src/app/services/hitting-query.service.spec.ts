import { TestBed } from '@angular/core/testing';

import { HittingService } from './hitting-query.service';

describe('HittingService', () => {
  let service: HittingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HittingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
