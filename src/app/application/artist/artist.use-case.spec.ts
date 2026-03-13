import { TestBed } from '@angular/core/testing';

import { ArtistUseCase } from './artist.use-case';

describe('ArtistService', () => {
  let service: ArtistUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
