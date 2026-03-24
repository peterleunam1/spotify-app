import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeningHeatmapComponent } from './listening-heatmap.component';

describe('ListeningHeatmapComponent', () => {
  let component: ListeningHeatmapComponent;
  let fixture: ComponentFixture<ListeningHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeningHeatmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeningHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
