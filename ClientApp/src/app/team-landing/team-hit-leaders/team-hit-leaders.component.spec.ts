import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamHitLeadersComponent } from './team-hit-leaders.component';

describe('TeamHitLeadersComponent', () => {
  let component: TeamHitLeadersComponent;
  let fixture: ComponentFixture<TeamHitLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamHitLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamHitLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
