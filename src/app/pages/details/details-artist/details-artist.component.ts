import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-details-artist',
  templateUrl: './details-artist.component.html',
  styleUrls: ['./details-artist.component.scss']
})
export class DetailsArtistComponent implements OnInit {

  artist: any;
  albums = [];

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.spotify.getArtist(params['id']).subscribe(result => {
        this.artist = result;
      });
    });
    this.route.params.subscribe(params => {
      this.spotify.getAlbumsByArtist(params['id']).subscribe(result => {
        result.sort((a, b) => {
          let aReleaseDate = a.releaseDate;
          let bReleaseDate = b.releaseDate;

          if (a.releaseDatePrecision === 'year') {
            aReleaseDate = a.releaseDate + '-01-01';
          }
          if (b.releaseDatePrecision === 'year') {
            bReleaseDate = b.releaseDate + '-01-01';
          }

          aReleaseDate = +aReleaseDate.replace(new RegExp('-', 'g'), '');
          bReleaseDate = +bReleaseDate.replace(new RegExp('-', 'g'), '');

          if (aReleaseDate < bReleaseDate) {
            return -1;
          }
          if (aReleaseDate > bReleaseDate) {
            return 1;
          }

          return 0;
        });
        this.albums = result.slice(0, 5);
      });
    });
  }

}
