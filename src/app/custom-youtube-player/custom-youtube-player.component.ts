import {Component, OnInit, ViewChild} from '@angular/core';
import {AppStoreService} from '../store/app-store.service';
import {YoutubeVideo} from '../web-design/youtube/youtubeVideo.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {filter, switchMap} from 'rxjs/operators';
import {YouTubePlayer} from '@angular/youtube-player';

@Component({
  selector: 'app-custom-youtube-player',
  templateUrl: './custom-youtube-player.component.html',
  styleUrls: ['./custom-youtube-player.component.css']
})
export class CustomYoutubePlayerComponent implements OnInit {

  playlistId: string;
  playlistVideos;
  currentVideo;
  @ViewChild(YouTubePlayer) youtubePlayer;
  apiLoaded = false;
  index = 0;
  width;
  height;


  constructor(private store: AppStoreService, private http: HttpClient) {
    window.addEventListener('resize', this.updateMeasurements);
    this.updateMeasurements();
  }


  ngOnInit(): void {

    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }

    this.store.spyOnPlaylistId().pipe(
      filter(id => !!id),
      switchMap(id => {
          this.playlistId = id;
          return this.http.get<YoutubeVideo[]>(environment.JAVA_API + `/youtube/playlist/${this.playlistId}`);
        }
      ),
      filter(r => !!r.length))
      .subscribe(r => {
        localStorage.setItem('playlistId', this.playlistId);
        this.playlistVideos = r;
        this.index = 0;
        this.currentVideo = this.playlistVideos[this.index];
      });
  }

  playVideo() {
    this.youtubePlayer.playVideo();
  }

  pauseVideo() {
    this.youtubePlayer.pauseVideo();
  }

  nextVideo() {
    this.index = (this.index + 1) % this.playlistVideos.length;
    this.currentVideo = this.playlistVideos[this.index];
  }

  previousVideo() {
    this.index = this.index - 1 < 0 ? this.playlistVideos.length - 1 : this.index - 1;
    this.currentVideo = this.playlistVideos[this.index];
  }

  onStateChange() {
    if (this.youtubePlayer.getPlayerState() === 0) {
      this.nextVideo();
    }
    if (this.youtubePlayer.getPlayerState() === 5) {
      this.youtubePlayer.playVideo();
    }
  }

  updateMeasurements() {
    this.width = 270;
    this.height = 150;
  }

  hide() {
    this.width = 0;
  }

  show() {
    this.width = 270;
  }

}
