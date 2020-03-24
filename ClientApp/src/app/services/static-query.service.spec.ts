import { TestBed } from '@angular/core/testing';

import { StaticqueryService } from './static-query.service';

describe('StaticqueryService', () => {
  let service: StaticqueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticqueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
