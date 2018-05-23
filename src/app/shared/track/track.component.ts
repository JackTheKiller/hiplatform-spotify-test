import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IndexedDBService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  @Input() track: any;

  @Output() favorite = new EventEmitter();

  constructor(
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    this.db.getById(this.track.id, 'track').addEventListener('success', (event) => {
      const record = event.target.result;
      if (record) { this.track.favorited = true; }
    });
  }

  toggleFavorite(track) {
    this.db.toggleRecord(track, 'track');
    track.favorited = !track.favorited;
    this.favorite.emit({
      obj: track,
      type: 'track',
      favorited: track.favorited
    });
  }

}
