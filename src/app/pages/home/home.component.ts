import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginLink = '';

  constructor(
    private spotify: SpotifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.spotify.isAuthenticated()) {
      this.loginLink = this.spotify.getAuthorizationURL();
    }
  }

}
