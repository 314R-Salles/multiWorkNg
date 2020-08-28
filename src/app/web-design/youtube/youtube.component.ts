import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {YoutubeVideo} from './youtubeVideo.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Snippet, YoutubeChannel} from './youtubeChannel.model';
import {getShortenedString} from '../../shared/stringUtils';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  videos: YoutubeVideo[] = [];
  linkedChannels: YoutubeChannel[] = [];
  playerUrl: SafeResourceUrl;
  filteredKeywords: string[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.filteredKeywords.push('dwagonsong');
    this.filteredKeywords.push('crossfade');

    this.http.get<YoutubeChannel[]>(environment.JAVA_API + '/youtube/user/UC8aqrd64EoFHLjbQtEXFf_w/linkedChannels').subscribe(
      r => this.linkedChannels = this.updateLinkedChannels(r)
    );
    this.http.get<YoutubeVideo[]>(environment.JAVA_API + '/youtube/user/UC8aqrd64EoFHLjbQtEXFf_w/videos').subscribe(
      r => this.videos = this.limitToNineResults(this.removeFilteredKeywords(r))
    );
  }

  removeFilteredKeywords(arr: YoutubeVideo[]) {
    return arr.filter(video => !this.filteredKeywords.find(keyword => video.snippet.title.toLowerCase().includes(keyword.toLowerCase())));
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
        snippet: {
          ...channel.snippet,
          description: getShortenedString(channel.snippet.description, 70),
          title: getShortenedString(channel.snippet.title, 15)
        }
      };
    });
  }

  /** not every user has a "customUrl" field defined" */

  getYoutubeChannelUrl(snippet: Snippet) {
    if (snippet.customUrl) {
      return 'https://youtube.com/c/' + snippet.customUrl;
    } else {
      return 'https://youtube.com/user/' + snippet.title;
    }
  }

}
