import { TestBed } from '@angular/core/testing';

import { ProfileUseCase } from './profile.use-case';

describe('ProfileService', () => {
  let service: ProfileUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
