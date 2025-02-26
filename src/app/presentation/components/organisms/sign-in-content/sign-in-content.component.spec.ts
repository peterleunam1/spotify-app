import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInContentComponent } from './sign-in-content.component';

describe('SignInContentComponent', () => {
  let component: SignInContentComponent;
  let fixture: ComponentFixture<SignInContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
