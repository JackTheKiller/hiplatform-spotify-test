import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAlbumComponent } from './details-album.component';

describe('DetailsAlbumComponent', () => {
  let component: DetailsAlbumComponent;
  let fixture: ComponentFixture<DetailsAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
