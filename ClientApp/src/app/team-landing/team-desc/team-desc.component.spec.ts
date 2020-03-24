import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDescComponent } from './team-desc.component';

describe('TeamDescComponent', () => {
  let component: TeamDescComponent;
  let fixture: ComponentFixture<TeamDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
