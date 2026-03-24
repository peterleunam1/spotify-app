import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatAndStatsComponent } from './repeat-and-stats.component';

describe('RepeatAndStatsComponent', () => {
  let component: RepeatAndStatsComponent;
  let fixture: ComponentFixture<RepeatAndStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepeatAndStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeatAndStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
