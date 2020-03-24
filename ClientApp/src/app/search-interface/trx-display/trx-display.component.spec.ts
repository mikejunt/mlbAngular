import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrxDisplayComponent } from './trx-display.component';

describe('TrxDisplayComponent', () => {
  let component: TrxDisplayComponent;
  let fixture: ComponentFixture<TrxDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrxDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrxDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
