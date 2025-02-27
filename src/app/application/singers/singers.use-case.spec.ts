import { TestBed } from '@angular/core/testing';

import { SingerUseCase } from './singers.use-case';

describe('SingersService', () => {
  let service: SingerUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingerUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
