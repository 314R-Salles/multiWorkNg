import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor() {
  }

  initApp() {
    this.extractToken();
  }

  clearHash() {
    location.hash = '/twitch';
  }

  extractToken() {
    const hash = document.location.hash;
    const tokenAnchor = 'access_token=';
    if (hash && hash.indexOf(tokenAnchor) !== -1) {
      const index = hash.indexOf(tokenAnchor);
      sessionStorage.setItem('twitch', hash.substr(index + tokenAnchor.length, 30));
      this.clearHash();
    }
  }

}
