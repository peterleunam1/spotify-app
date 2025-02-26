import { TestBed } from '@angular/core/testing';

import { AlbumsUseCase } from './albums.use-case';

describe('AlbumsService', () => {
  let service: AlbumsUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumsUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
