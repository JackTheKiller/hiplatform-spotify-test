import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../../services/spotify.service';

@Component({
  selector: 'app-details-album',
  templateUrl: './details-album.component.html',
  styleUrls: ['./details-album.component.scss']
})
export class DetailsAlbumComponent implements OnInit {

  album: any;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.spotify.getAlbum(params['id']).subscribe(result => {
        this.album = result;
      });
    });
  }

}
