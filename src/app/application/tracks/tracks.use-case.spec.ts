import { TestBed } from '@angular/core/testing';

import { TracksUseCase } from './tracks.use-case';

describe('TracksService', () => {
  let service: TracksUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracksUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
