import {Component} from '@angular/core';
import {getQueryVariable} from '../shared/stringUtils';
import {YoutubeVideo} from '../web-design/youtube/youtubeVideo.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppStoreService} from '../store/app-store.service';
import {savePlaylist} from '../store/app.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  playlistUrl;
  playlistId;

  constructor(private http: HttpClient, private store: AppStoreService) {
  }

  updateUrl() {
    this.playlistId = getQueryVariable(this.playlistUrl, 'list');
    this.store.dispatch(savePlaylist({youtubePlaylistId: this.playlistId}));
  }

}
