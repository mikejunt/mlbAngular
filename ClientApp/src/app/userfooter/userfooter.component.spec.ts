import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfooterComponent } from './userfooter.component';

describe('UserfooterComponent', () => {
  let component: UserfooterComponent;
  let fixture: ComponentFixture<UserfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
