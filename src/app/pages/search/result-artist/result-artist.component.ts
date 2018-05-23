import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-artist',
  templateUrl: './result-artist.component.html',
  styleUrls: ['./result-artist.component.scss'],
  providers: [SpotifyService]
})
export class ResultArtistComponent implements OnInit {

  result = {
    artists: null,
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
      this.spotify.getArtists(params['keyword'], limit, offset).subscribe(result => {
        this.result = result;
      });
    });
  }

  pageEvent(event) {
    document.querySelector('mat-card:first-child').scrollIntoView({ behavior: 'smooth' });
    this.getResult(event.pageSize, event.pageSize * event.pageIndex);
  }

}
