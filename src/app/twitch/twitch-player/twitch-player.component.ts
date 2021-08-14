import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {User} from '../models/user';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-twitch-player',
  templateUrl: './twitch-player.component.html',
  styleUrls: ['./twitch-player.component.css']
})
export class TwitchPlayerComponent implements OnChanges {
  @Input() streamer: User;
  iframeUrl: SafeResourceUrl;
  parent = environment.TWITCH_PARENT;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://player.twitch.tv/?channel=${this.streamer.username}&parent=${this.parent}`);
  }


}
