import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-result-track',
  templateUrl: './result-track.component.html',
  styleUrls: ['./result-track.component.scss']
})
export class ResultTrackComponent implements OnInit {

  result = {
    tracks: null,
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
      this.spotify.getTracks(params['keyword'], limit, offset).subscribe(result => {
        this.result = result;
      });
    });
  }

  pageEvent(event) {
    document.querySelector('mat-card:first-child').scrollIntoView({ behavior: 'smooth' });
    this.getResult(event.pageSize, event.pageSize * event.pageIndex);
  }

}
