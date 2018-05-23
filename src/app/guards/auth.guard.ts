import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.spotify.isAuthenticated()) { return true; }

    this.router.navigate(['/']);

    this.snackBar.open('Please, sign in first', 'Click here!', {
      duration: 5 * 60 * 1000,
    }).onAction().subscribe(() => {
      localStorage.setItem('redirect', this.router.url);
      window.location.href = this.spotify.getAuthorizationURL();
    });

    return false;
  }
}
