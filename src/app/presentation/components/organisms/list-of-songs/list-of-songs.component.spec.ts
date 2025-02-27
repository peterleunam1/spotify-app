import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSongsComponent } from './list-of-songs.component';

describe('ListOfSongsComponent', () => {
  let component: ListOfSongsComponent;
  let fixture: ComponentFixture<ListOfSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfSongsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
