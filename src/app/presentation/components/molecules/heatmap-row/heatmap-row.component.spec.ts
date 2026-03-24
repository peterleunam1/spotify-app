import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapRowComponent } from './heatmap-row.component';

describe('HeatmapRowComponent', () => {
  let component: HeatmapRowComponent;
  let fixture: ComponentFixture<HeatmapRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatmapRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatmapRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
