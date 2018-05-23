import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() album: any;
  @Input() hideDetailsButton = false;

  @Output() favorite = new EventEmitter();

  constructor(
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    this.db.getById(this.album.id, 'album').addEventListener('success', (event) => {
      const record = event.target.result;
      if (record) { this.album.favorited = true; }
    });
  }

  toggleFavorite(album) {
    this.db.toggleRecord(album, 'album');
    album.favorited = !album.favorited;
    this.favorite.emit({
      obj: album,
      type: 'album',
      favorited: album.favorited
    });
  }

}
