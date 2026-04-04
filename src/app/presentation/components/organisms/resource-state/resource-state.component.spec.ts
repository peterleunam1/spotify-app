import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceStateComponent } from './resource-state.component';

describe('ResourceStateComponent', () => {
  let component: ResourceStateComponent;
  let fixture: ComponentFixture<ResourceStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
