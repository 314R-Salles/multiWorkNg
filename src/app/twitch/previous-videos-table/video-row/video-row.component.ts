import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../models/video';

@Component({
  selector: 'app-video-row',
  templateUrl: './video-row.component.html',
  styleUrls: ['./video-row.component.css']
})
export class VideoRowComponent implements OnInit {
  @Input() video: Video;
  tiles;
  classes = {
    '0': 'title-tile',
    '1': 'description-tile',
    '2': 'preview-tile',
    '3': 'views-tile',
    '4': 'duration-tile',
    '5': 'date-tile'
  };

  constructor() {
  }

  ngOnInit() {
    this.tiles = [
      {text: this.video.title, cols: this.getVideoTitleTileWidth(), rows: 1},
      {text: this.video.description, cols: this.getVideoDescriptionTileWidth(), rows: 1},
      {text: '', cols: 2, rows: 2},
      {text: this.video.duration, cols: 1, rows: 1},
      {text: new Date(this.video.publishedAt).toLocaleDateString(), cols: 1, rows: 1},
      {text: 'Views: ' + this.video.viewCount, cols: 1, rows: 1},
    ];
  }

  getVideoTitleTileWidth() {
    const base = 1;
    const extra = 2;
    return Number(!!this.video.title) * base + Number(!this.video.description) * extra;
  }

  getVideoDescriptionTileWidth() {
    const base = 2;
    const extra = 1;
    return Number(!!this.video.description) * base + Number(!this.video.title) * extra;
  }

}
