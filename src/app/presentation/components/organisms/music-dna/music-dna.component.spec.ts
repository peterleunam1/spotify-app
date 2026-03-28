import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMusicDnaComponent } from './music-dna.component';

describe('MyMusicDnaComponent', () => {
  let component: MyMusicDnaComponent;
  let fixture: ComponentFixture<MyMusicDnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMusicDnaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMusicDnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
