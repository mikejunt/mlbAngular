import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchingDisplayComponent } from './pitching-display.component';

describe('PitchingDisplayComponent', () => {
  let component: PitchingDisplayComponent;
  let fixture: ComponentFixture<PitchingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchingDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
