import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-result-album',
  templateUrl: './result-album.component.html',
  styleUrls: ['./result-album.component.scss']
})
export class ResultAlbumComponent implements OnInit {

  result = {
    albums: null,
    total: 0,
    limit: 10
  };

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) { }

  ngOnInit() {
    this.getResult();
  }

  getResult(limit?, offset?) {
    this.route.params.subscribe(params => {
      this.spotify.getAlbums(params['keyword'], limit, offset).subscribe(result => {
        this.result = result;
      });
    });
  }

  pageEvent(event) {
    document.querySelector('mat-card:first-child').scrollIntoView({ behavior: 'smooth' });
    this.getResult(event.pageSize, event.pageSize * event.pageIndex);
  }

}
