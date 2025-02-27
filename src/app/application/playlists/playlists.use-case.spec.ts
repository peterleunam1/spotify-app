import { TestBed } from '@angular/core/testing';

import { PlaylistsUseCase } from './playlists.use-case';

describe('PlaylistsService', () => {
  let service: PlaylistsUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistsUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
