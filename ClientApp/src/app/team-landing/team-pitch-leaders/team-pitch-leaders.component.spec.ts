import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPitchLeadersComponent } from './team-pitch-leaders.component';

describe('TeamPitchLeadersComponent', () => {
  let component: TeamPitchLeadersComponent;
  let fixture: ComponentFixture<TeamPitchLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPitchLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPitchLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
