import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {YoutubeVideo} from './youtubeVideo.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {YoutubeChannel} from './youtubeChannel.model';
import {getShortenedString} from '../../shared/stringUtils';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  filteredVideos: YoutubeVideo[] = [];
  allVideos: YoutubeVideo[] = [];
  linkedChannels: YoutubeChannel[] = [];
  playerUrl: SafeResourceUrl;
  filteredKeywords: string[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.filteredKeywords.push('dwagonsong');
    this.filteredKeywords.push('crossfade');

    // this.http.get<YoutubeChannel[]>(environment.JAVA_API + '/youtube/channel/UC8aqrd64EoFHLjbQtEXFf_w/featured').subscribe(
    //   r => this.linkedChannels = this.updateLinkedChannels(r)
    // );

    this.http.get<YoutubeVideo[]>(environment.JAVA_API + '/youtube/channel/UC8aqrd64EoFHLjbQtEXFf_w/allVideos').subscribe(
      r => {
        this.allVideos = r;
        this.filteredVideos = this.limitToNineResults(this.removeFilteredKeywords(r));
      });
  }


  removeFilteredKeywords(arr: YoutubeVideo[]) {
    return arr.filter(video => !this.filteredKeywords.find(keyword => video.title.toLowerCase().includes(keyword.toLowerCase())));
  }

  limitToNineResults(arr: YoutubeVideo[]) {
    arr.length = 9;
    return arr;
  }

  setPlayerUrl(id: string) {
    if (id) {
      this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${id}`
      );
    }
  }

  updateLinkedChannels(channels: YoutubeChannel[]) {
    return channels.map(channel => {
      return {
        ...channel,
        description: getShortenedString(channel.description, 70),
        title: getShortenedString(channel.title, 15)
      };
    });
  }

  /** not every user has a "customUrl" field defined" */
  getYoutubeChannelUrl(channel: YoutubeChannel) {
    if (channel.customUrl) {
      return 'https://youtube.com/c/' + channel.customUrl;
    } else {
      return 'https://youtube.com/user/' + channel.title;
    }
  }


}
