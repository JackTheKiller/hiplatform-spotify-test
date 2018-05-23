import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultAlbumComponent } from './result-album.component';

describe('ResultAlbumComponent', () => {
  let component: ResultAlbumComponent;
  let fixture: ComponentFixture<ResultAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
