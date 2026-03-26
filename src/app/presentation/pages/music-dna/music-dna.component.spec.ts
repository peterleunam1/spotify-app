import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicDnaComponent } from './music-dna.component';

describe('MusicDnaComponent', () => {
  let component: MusicDnaComponent;
  let fixture: ComponentFixture<MusicDnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicDnaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicDnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
