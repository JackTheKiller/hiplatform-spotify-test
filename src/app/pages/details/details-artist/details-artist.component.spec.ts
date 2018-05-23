import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArtistComponent } from './details-artist.component';

describe('DetailsArtistComponent', () => {
  let component: DetailsArtistComponent;
  let fixture: ComponentFixture<DetailsArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
