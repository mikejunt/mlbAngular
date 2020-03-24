import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTrxComponent } from './team-trx.component';

describe('TeamTrxComponent', () => {
  let component: TeamTrxComponent;
  let fixture: ComponentFixture<TeamTrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
