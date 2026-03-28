import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageBarComponent } from './percentage-bar/percentage-bar.component';

describe('PercentageBarComponent', () => {
  let component: PercentageBarComponent;
  let fixture: ComponentFixture<PercentageBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentageBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
