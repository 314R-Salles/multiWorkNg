import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {TwitchHttpService} from '../twitch-http-service';

@Component({
  selector: 'app-twitch-row',
  templateUrl: './twitch-row.component.html',
  styleUrls: ['./twitch-row.component.css']
})
export class TwitchRowComponent implements OnInit {

  @Input() user: User;
  tiles;
  noStreamTiles;

  constructor(private twitchService: TwitchHttpService) {
  }

  ngOnInit() {
    if (this.user.live) {
      this.tiles = [
        {text: this.user.live.username, cols: 1, rows: 1, color: 'lightblue'},
        {text: this.user.live.title, cols: 2, rows: 1, color: 'lightpink'},
        {text: '', cols: 2, rows: 2, color: ''},
        {text: 'Viewers :' + this.user.live.viewerCount, cols: 3, rows: 1, color: '#DDBDF1'},
      ];
    } else {
      this.noStreamTiles = [
        {text: this.user.displayName, cols: 1, rows: 1, color: 'lightblue'},
        {text: this.user.description, cols: 3, rows: 1, color: 'lightpink'},
        {text: 'Views :' + this.user.viewCount, cols: 1, rows: 1, color: '#DDBDF1'},
      ];
    }
  }

}
