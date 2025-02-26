import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSingersComponent } from './list-of-singers.component';

describe('ListOfSingersComponent', () => {
  let component: ListOfSingersComponent;
  let fixture: ComponentFixture<ListOfSingersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfSingersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfSingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
