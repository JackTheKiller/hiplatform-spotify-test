import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  authURL = 'https://accounts.spotify.com/authorize?';
  apiURL = 'https://api.spotify.com/v1';
  clientId = '9b32bf542dd242d1b58d6f49a60238e5';
  redirectUri = window.location.protocol + '//' + window.location.host + '/';
  scope = '';

  userToken = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userToken = localStorage.getItem('token');
  }

  getAuthorizationURL(): string {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('response_type', 'token')
      .set('scope', this.scope)
      .set('redirect_uri', this.redirectUri);

    return this.authURL + params.toString();
  }

  setUserToken(token) {
    this.userToken = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated() {
    return !!this.userToken;
  }

  getSingleRecord(id, type) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.userToken);

    const result = this.http.get(`${this.apiURL}/${type}s/${id}`, { headers });

    result.subscribe(() => { }, (e) => this.handleError(e));

    return result;
  }

  getArtist(id) {
    return this.getSingleRecord(id, 'artist')
      .pipe(map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          avatar: item.images[0] ? item.images[0].url : '',
          popularity: item.popularity,
          genres: item.genres
        };
      }));
  }

  getAlbumsByArtist(id) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.userToken);

    const result = this.http.get(`${this.apiURL}/artists/${id}/albums`, { headers });

    result.subscribe(() => { }, (e) => this.handleError(e));

    return result.pipe(map((data: any) => {
      const albums = [];
      data.items.forEach(item => {
        const artists = item.artists.map((artist: any) => {
          return { id: artist.id, name: artist.name };
        });

        albums.push({
          id: item.id,
          name: item.name,
          cover: item.images[0] ? item.images[0].url : '',
          artists: artists,
          availability: item.available_markets,
          releaseDate: item.release_date,
          releaseDatePrecision: item.release_date_precision
        });
      });
      return albums;
    }));
  }

  getAlbum(id) {
    return this.getSingleRecord(id, 'album')
      .pipe(map((item: any) => {
        const artists = item.artists.map((artist: any) => {
          return { id: artist.id, name: artist.name };
        });

        const tracks = item.tracks.items.map((track: any) => {
          const trackArtists = track.artists.map((artist: any) => {
            return { id: artist.id, name: artist.name };
          });
          return {
            id: track.id,
            name: track.name,
            cover: item.images[0] ? item.images[0].url : '',
            album: { id: item.id, name: item.name },
            artists: trackArtists,
            duration: this.millisToMinutesAndSeconds(track.duration_ms)
          };
        });

        return {
          id: item.id,
          name: item.name,
          cover: item.images[0] ? item.images[0].url : '',
          artists: artists,
          availability: item.available_markets,
          tracks: tracks
        };
      }));
  }

  search(keyword, type, limit?, offset?) {
    limit = limit || 10;
    offset = offset || 0;

    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.userToken);

    const params = new HttpParams()
      .set('q', keyword)
      .set('type', type)
      .set('limit', limit)
      .set('offset', offset);

    const result = this.http.get(`${this.apiURL}/search`, { headers, params });

    result.subscribe(() => { }, (e) => this.handleError(e));

    return result;
  }

  handleError(e) {
    this.setUserToken(null);
    this.snackBar.open('Access expired', 'Click here to refresh', {
      duration: 5 * 60 * 1000,
    }).onAction().subscribe(() => {
      localStorage.setItem('redirect', this.router.url);
      window.location.href = this.getAuthorizationURL();
    });
  }

  getArtists(keyword, limit?, offset?) {
    return this.search(keyword, 'artist', limit, offset)
      .pipe(map((data: any) => {
        const artists = [];
        data.artists.items.forEach(item => {
          artists.push({
            id: item.id,
            name: item.name,
            avatar: item.images[0] ? item.images[0].url : '',
            popularity: item.popularity,
            genres: item.genres
          });
        });

        return {
          total: data.artists.total,
          limit: data.artists.limit,
          offset: data.artists.offset,
          artists
        };
      }));
  }

  getAlbums(keyword, limit?, offset?) {
    return this.search(keyword, 'album', limit, offset)
      .pipe(map((data: any) => {
        const albums = [];
        data.albums.items.forEach(item => {
          const artists = item.artists.map((artist: any) => {
            return { id: artist.id, name: artist.name };
          });

          albums.push({
            id: item.id,
            name: item.name,
            cover: item.images[0] ? item.images[0].url : '',
            artists: artists,
            availability: item.available_markets
          });
        });

        return {
          total: data.albums.total,
          limit: data.albums.limit,
          offset: data.albums.offset,
          albums
        };
      }));
  }

  getTracks(keyword, limit?, offset?) {
    return this.search(keyword, 'track', limit, offset)
      .pipe(map((data: any) => {
        const tracks = [];
        data.tracks.items.forEach(item => {
          const artists = item.artists.map((artist: any) => {
            return { id: artist.id, name: artist.name };
          });

          tracks.push({
            id: item.id,
            name: item.name,
            cover: item.album.images[0] ? item.album.images[0].url : '',
            album: { id: item.album.id, name: item.album.name },
            artists: artists,
            duration: this.millisToMinutesAndSeconds(item.duration_ms)
          });
        });

        return {
          total: data.tracks.total,
          limit: data.tracks.limit,
          offset: data.tracks.offset,
          tracks
        };
      }));
  }

  private millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = +((millis % 60000) / 1000).toFixed(0);
    return (seconds === 60 ? (minutes + 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
  }

}
