import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HittingDisplayComponent } from './hitting-display.component';

describe('HittingDisplayComponent', () => {
  let component: HittingDisplayComponent;
  let fixture: ComponentFixture<HittingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HittingDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HittingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
