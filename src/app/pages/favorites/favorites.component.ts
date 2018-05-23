import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  artists: any[];
  albums: any[];
  tracks: any[];

  constructor(
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    this.db.getAll('artist').addEventListener('success', (event) => {
      this.artists = event.target.result;
    });
    this.db.getAll('album').addEventListener('success', (event) => {
      this.albums = event.target.result;
    });
    this.db.getAll('track').addEventListener('success', (event) => {
      this.tracks = event.target.result;
    });
  }

  toggleFavorite(event) {
    if (event.favorited) { return; }
    switch (event.type) {
      case 'artist':
        this.artists = this.artists.filter(item => item.id !== event.obj.id);
        break;
      case 'album':
        this.albums = this.albums.filter(item => item.id !== event.obj.id);
        break;
      case 'track':
        this.tracks = this.tracks.filter(item => item.id !== event.obj.id);
        break;
    }
  }

}
