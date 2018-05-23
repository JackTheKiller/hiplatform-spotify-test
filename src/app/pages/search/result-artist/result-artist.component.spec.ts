import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultArtistComponent } from './result-artist.component';

describe('ResultArtistComponent', () => {
  let component: ResultArtistComponent;
  let fixture: ComponentFixture<ResultArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
