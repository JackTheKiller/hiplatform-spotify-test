import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTrackComponent } from './result-track.component';

describe('ResultTrackComponent', () => {
  let component: ResultTrackComponent;
  let fixture: ComponentFixture<ResultTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
