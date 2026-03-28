import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRangerSelectorComponent } from './time-ranger-selector.component';

describe('TimeRangerSelectorComponent', () => {
  let component: TimeRangerSelectorComponent;
  let fixture: ComponentFixture<TimeRangerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeRangerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeRangerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
