import {Injectable} from '@angular/core';
import {AppStoreService} from './store/app-store.service';
import {savePlaylist} from './store/app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(private appStoreService: AppStoreService) {
  }

  initApp() {
    this.extractToken();
    this.setPlaylist();
  }

  clearHash() {
    location.hash = '/twitch';
  }

  setPlaylist() {
    this.appStoreService.dispatch(savePlaylist({youtubePlaylistId: localStorage.getItem('playlistId')}));
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
