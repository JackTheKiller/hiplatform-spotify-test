import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';

import { AuthGuard } from './guards/auth.guard';

import { SpotifyService } from './services/spotify.service';
import { IndexedDBService } from './services/indexed-db.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ResultArtistComponent } from './pages/search/result-artist/result-artist.component';
import { ResultAlbumComponent } from './pages/search/result-album/result-album.component';
import { ResultTrackComponent } from './pages/search/result-track/result-track.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ArtistComponent } from './shared/artist/artist.component';
import { AlbumComponent } from './shared/album/album.component';
import { TrackComponent } from './shared/track/track.component';
import { DetailsArtistComponent } from './pages/details/details-artist/details-artist.component';
import { DetailsAlbumComponent } from './pages/details/details-album/details-album.component';

// Routes
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'search', component: SearchComponent, canActivate: [AuthGuard],
    children: [
      { path: 'artist/:keyword', component: ResultArtistComponent },
      { path: 'album/:keyword', component: ResultAlbumComponent },
      { path: 'track/:keyword', component: ResultTrackComponent }
    ]
  },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'artist/:id', component: DetailsArtistComponent, canActivate: [AuthGuard] },
  { path: 'album/:id', component: DetailsAlbumComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SearchComponent,
    ResultArtistComponent,
    ResultAlbumComponent,
    ResultTrackComponent,
    PageNotFoundComponent,
    FavoritesComponent,
    ArtistComponent,
    AlbumComponent,
    TrackComponent,
    DetailsArtistComponent,
    DetailsAlbumComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
