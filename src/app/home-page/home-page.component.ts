import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  SLR_DAILY_URL = 'https://www.wuxiaworld.com/novel/second-life-ranker/slr-chapter-';

  constructor() {
    const reference = moment([2021, 8, 15]); // 8 is september
    const today = moment();

    this.SLR_DAILY_URL += 574 + today.diff(reference, 'days');
  }


}

