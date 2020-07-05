import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  videos: SafeResourceUrl[];

  constructor(private dashboardService: DashboardService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.dashboardService.getHomeVideos()
      .subscribe(videos => this.videos =
        videos.map(video => this.sanitizer.bypassSecurityTrustResourceUrl(video.url)));
  }

}
