import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPlaylistsComponent } from './list-of-playlists.component';

describe('ListOfPlaylistsComponent', () => {
  let component: ListOfPlaylistsComponent;
  let fixture: ComponentFixture<ListOfPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfPlaylistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
