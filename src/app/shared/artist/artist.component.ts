import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  @Input() artist: any;
  @Input() hideDetailsButton = false;

  @Output() favorite = new EventEmitter();

  constructor(
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    this.db.getById(this.artist.id, 'artist').addEventListener('success', (event) => {
      const record = event.target.result;
      if (record) { this.artist.favorited = true; }
    });
  }

  toggleFavorite(artist) {
    this.db.toggleRecord(artist, 'artist');
    artist.favorited = !artist.favorited;
    this.favorite.emit({
      obj: artist,
      type: 'artist',
      favorited: artist.favorited
    });
  }

}
