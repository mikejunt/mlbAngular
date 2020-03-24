import { TestBed } from '@angular/core/testing';

import { UserchildGuard } from './userchild.guard';

describe('UserchildGuard', () => {
  let guard: UserchildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserchildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
