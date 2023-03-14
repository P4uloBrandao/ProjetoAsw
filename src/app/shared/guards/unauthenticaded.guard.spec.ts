import { TestBed } from '@angular/core/testing';

import { UnauthenticadedGuard } from './unauthenticaded.guard';

describe('UnauthenticadedGuard', () => {
  let guard: UnauthenticadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnauthenticadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
