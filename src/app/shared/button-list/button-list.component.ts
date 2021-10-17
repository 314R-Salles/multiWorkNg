import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css']
})
export class ButtonListComponent {

  math = Math;
  currentRoute;
  navigationId;

  buttons;

  SLR_DAILY_URL = 'https://www.wuxiaworld.com/novel/second-life-ranker/slr-chapter-';

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.pipe(
      map(a => a),
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        this.currentRoute = (<NavigationEnd>event).urlAfterRedirects.substring(1);
        this.navigationId = (<NavigationEnd>event).id;
      });

    const reference = moment([2021, 8, 15]); // 8 is september
    const today = moment();

    this.SLR_DAILY_URL += 574 + today.diff(reference, 'days');


    this.buttons = [
      {size: 12, img: 'assets/youtube.png', redirect: 'youtube'},
      {size: 12, img: 'assets/rer_b.png', redirect: 'rer'},
      {size: 12, img: 'assets/TwitchPurple.png', text: '', redirect: 'twitch'},
      {size: 12, img: 'assets/Processing.png', text: '', redirect: 'processing'},
      {size: 12, img: 'assets/Swagger.png', text: '', redirect: environment.SWAGGER_URL, newTab: true},
      {size: 12, img: 'assets/webtoon.png', text: '', redirect: 'https://www.webtoons.com/en/dailySchedule', newTab: true},
      {size: 12, img: '', text: 'SLR daily chapter', redirect: this.SLR_DAILY_URL, newTab: true},
      {
        size: 12,
        img: '',
        text: 'Project documentation <i class="material-icons">lock</i>',
        redirect: 'https://docs.google.com/document/d/1IgnZucdU3wq-uBSizw7HuPyaE6IARr1bERef5x3M268/edit#heading=h.kqa87xz22s4m',
        newTab: true
      },
      {
        size: 12,
        img: '',
        text: 'Arknight recruitment guide',
        redirect: 'https://aceship.github.io/AN-EN-Tags/akhr.html',
        newTab: true
      },
      {size: 12, img: '', text: '', redirect: 'home'},
    ];


  }
}
