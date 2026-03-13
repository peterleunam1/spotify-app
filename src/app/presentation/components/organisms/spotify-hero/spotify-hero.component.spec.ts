import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyHeroComponent } from './spotify-hero.component';

describe('SpotifyHeroComponent', () => {
  let component: SpotifyHeroComponent;
  let fixture: ComponentFixture<SpotifyHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
