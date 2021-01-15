import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../models/user';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-twitch-player',
  templateUrl: './twitch-player.component.html',
  styleUrls: ['./twitch-player.component.css']
})
export class TwitchPlayerComponent implements OnInit, OnChanges {
  @Input() streamer: User;
  iframeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://player.twitch.tv/?channel=${this.streamer.username}&parent=psalles.ovh`);
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `https://player.twitch.tv/?channel=${this.streamer.username}&parent=localhost`);
  // }

  ngOnInit() {
  }

}
