import {Injectable} from '@angular/core';
import {AppStoreService} from './store/app-store.service';
import {savePlaylist, setBandcampAlbumId, setGoogleToken, setMeteo} from './store/app.actions';
import {Geolocation, GeolocationHttpService} from './localization/geolocation-http.service';
import {map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private appStoreService: AppStoreService, private geolocationHttpService: GeolocationHttpService) {
  }

  initApp() {
    this.extractToken();
    this.setPlaylist();
    this.getLocationAndAll();
  }

  clearHash() {
    location.hash = '/twitch';
  }

  getLocationAndAll() {
    let geolocation$;
    if (!localStorage.getItem('geolocation')) {
      geolocation$ = this.geolocationHttpService.getAll();
    } else {
      geolocation$ = of(JSON.parse(localStorage.getItem('geolocation')));
    }
    geolocation$.pipe(
      map((geolocation: Geolocation) => {
        localStorage.setItem('geolocation', JSON.stringify(geolocation));
        return [geolocation.latitude, geolocation.longitude];
      }),
      switchMap(([lat, lon]) => this.geolocationHttpService.getWeather(lat, lon))
    ).subscribe(meteo => this.appStoreService.dispatch(setMeteo({meteo})));
  }

  setPlaylist() {
    this.appStoreService.dispatch(savePlaylist({youtubePlaylistId: localStorage.getItem('playlistId')}));
    this.appStoreService.dispatch(setBandcampAlbumId({bandcampAlbumId: localStorage.getItem('bandcampAlbumId')}));
    this.appStoreService.dispatch(setGoogleToken({googleToken: localStorage.getItem('googleToken')}));
  }

  extractToken() {
    const hash = document.location.hash;
    const tokenAnchor = 'access_token=';
    if (hash && hash.indexOf(tokenAnchor) !== -1) {
      const index = hash.indexOf(tokenAnchor);
      localStorage.setItem('twitch', hash.substr(index + tokenAnchor.length, 30));
      this.clearHash();
    }
  }

}
