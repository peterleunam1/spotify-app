import { TestBed } from '@angular/core/testing';
import { DominantColorState } from './dominant-color.service';


describe('DominantColorService', () => {
  let service: DominantColorState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DominantColorState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
