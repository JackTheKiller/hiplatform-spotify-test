import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(
    private breakpointObserver: BreakpointObserver,
    private spotify: SpotifyService,
    private router: Router
  ) {

    const hash = window.location.hash;
    if (hash.indexOf('#access_token') !== -1) {
      const query = hash.slice(1);
      const vars = query.split('&');
      const params = [];
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        params[pair[0]] = pair[1];
      }
      this.spotify.setUserToken(params['access_token']);

      const redirectURL = localStorage.getItem('redirect');
      if (redirectURL) {
        localStorage.removeItem('redirect');
        this.router.navigate(redirectURL.split('/'));
      } else {
        this.router.navigate(['']);
      }
    }
  }
}
