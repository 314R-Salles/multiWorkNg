import {Component, OnInit} from '@angular/core';
import {getQueryVariable} from '../shared/stringUtils';
import {savePlaylist} from '../store/app.actions';
import {GoogleLoginDialogComponent} from '../google-login-dialog/google-login-dialog.component';
import {environment} from '../../environments/environment';
import {AppStoreService} from '../store/app-store.service';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-youtube-menu',
  templateUrl: './youtube-menu.component.html',
  styleUrls: ['./youtube-menu.component.css']
})
export class YoutubeMenuComponent implements OnInit {

  playlistUrl;
  playlistId;
  playlists;
  token: string;

  constructor(private store: AppStoreService, private formBuilder: FormBuilder,
              private http: HttpClient, private dialog: MatDialog) {
  }

  updateUrl() {
    this.playlistId = getQueryVariable(this.playlistUrl, 'list');
    this.store.dispatch(savePlaylist({youtubePlaylistId: this.playlistId}));
  }

  setPlaylist(playlistId) {
    this.playlistId = playlistId;
    this.store.dispatch(savePlaylist({youtubePlaylistId: playlistId}));
  }

  openModal() {
    this.dialog.open(GoogleLoginDialogComponent);
  }

  ngOnInit(): void {
    this.store.getGoogleToken().subscribe(token => {
      this.token = token;
      this.http.get(environment.JAVA_API + '/youtube/playlists').subscribe(playlists => this.playlists = playlists);
    });
  }
}
