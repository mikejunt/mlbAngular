import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInterfaceComponent } from './search-interface.component';

describe('SearchInterfaceComponent', () => {
  let component: SearchInterfaceComponent;
  let fixture: ComponentFixture<SearchInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
