import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAlbumsComponent } from './list-of-albums.component';

describe('ListOfAlbumsComponent', () => {
  let component: ListOfAlbumsComponent;
  let fixture: ComponentFixture<ListOfAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfAlbumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
