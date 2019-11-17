import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../models/video';

@Component({
  selector: 'app-previous-videos-table',
  templateUrl: './previous-videos-table.component.html',
  styleUrls: ['./previous-videos-table.component.css']
})
export class PreviousVideosTableComponent implements OnInit {
  @Input() videos: Video[];

  constructor() { }

  ngOnInit() {
  }

}
