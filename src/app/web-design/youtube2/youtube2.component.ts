import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {YoutubeVideo} from '../youtube/youtubeVideo.model';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube2.component.html',
  styleUrls: ['./youtube2.component.css']
})
export class Youtube2Component implements OnInit {

  allVideos: YoutubeVideo[] = [];
  playerUrl: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.http.get<YoutubeVideo[]>(environment.JAVA_API + '/youtube/user/UC8aqrd64EoFHLjbQtEXFf_w/allVideos').subscribe(
      r => {
        this.allVideos = r;
      });
  }

  setPlayerUrl(id: string) {
    if (id) {
      this.playerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${id}`
      );
    }
  }

}
