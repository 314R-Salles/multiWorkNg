import {Component, OnInit} from '@angular/core';
import {HomePageService} from './home-page.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  videos: SafeResourceUrl[];

  constructor(private homePageService: HomePageService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.homePageService.getHomeVideos()
      .subscribe(videos => this.videos =
        videos.map(video => this.sanitizer.bypassSecurityTrustResourceUrl(video.url)));
  }

}
