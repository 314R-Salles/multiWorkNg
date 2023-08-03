import {AfterViewInit, Component, HostListener, QueryList, ViewChildren} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import * as moment from 'moment';
import {gsap} from 'gsap';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-button-list2',
  templateUrl: './button-list2.component.html',
  styleUrls: ['./button-list2.component.css']
})
export class ButtonList2Component implements AfterViewInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.pipe(
      map(a => a),
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        this.currentRoute = (<NavigationEnd>event).urlAfterRedirects.substring(1);
        this.navigationId = (<NavigationEnd>event).id;
        if (this.currentRoute === 'home' && this.navigationId > 1) {
          this.timeline.play();
        } else if (this.currentRoute !== 'home') {
          this.timeline.reverse();
        }
      });

    const reference = moment([2021, 8, 15]); // 8 is september
    const today = moment();

    this.SLR_DAILY_URL += 574 + today.diff(reference, 'days');
    this.setbuttons();

  }

  @ViewChildren(ButtonComponent) buttonComponents: QueryList<ButtonComponent>;

  timeline;

  math = Math;
  currentRoute;
  navigationId;

  left;

  buttons;
  offsetX;
  offsetY;

  innerWidth;
  innerHeight;

  portrait = false;

  SLR_DAILY_URL = 'https://www.wuxiaworld.com/novel/second-life-ranker/slr-chapter-';

  clickChild() {
    this.buttonComponents.forEach(button => button.triggerText());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setbuttons();
  }

  ngAfterViewInit() {
    this.timeline = gsap.timeline();
    this.timeline.from('.tata', {
      duration: 1,
      scale: 0.1,
      y: -50,
      x: -50,
      ease: 'power1.inOut',
      stagger: {
        grid: [5, 5],
        from: 'random',
        amount: 1.5
      },
      onComplete: () => {
        this.clickChild();
      },
    });


  }

  tx(x: number, size: number) {
    const result = [];
    for (let pas = 0; pas < x; pas++) {
      result.push({size, img: null, redirect: null});
    }
    return result;
  }

  setbuttons() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.portrait = window.innerHeight > window.innerWidth;
    let size = 14;
    if (this.portrait) {
      size = 17;
      this.offsetX = 0.75 * size;
      this.offsetY = 1.04 * size * Math.sqrt(3) / 4;
      this.buttons = [];
      this.left = size / 2 * 500 / this.innerWidth;
      if (this.innerWidth / this.innerHeight > 0.65) {
        this.buttons.push(...this.tx(11, size));
        this.buttons.push({size, img: null, redirect: null});
        this.buttons.push(...this.tx(3, size));
        this.left = size * (1 + 500 / this.innerWidth);
      }
      if (this.innerWidth / this.innerHeight > 0.9) {
        this.buttons.push(...this.tx(11, size));
        this.buttons.push({size, img: null, redirect: null});
        this.buttons.push(...this.tx(3, size));
        this.left = size * (2 + 500 / this.innerWidth);

      }
      this.buttons.push(...[
        ...this.tx(18, size),
        {size, img: 'assets/youtube.png', redirect: 'youtube'},
        {size, img: 'assets/rer_b.png', redirect: 'rer'},
        {size, img: 'assets/TwitchPurple.png', text: '', redirect: 'twitch'},
        {size, img: 'assets/Processing.png', text: '', redirect: 'processing'},
        {size, img: 'assets/Swagger.png', text: '', redirect: environment.SWAGGER_URL, newTab: true},
        {size, img: 'assets/webtoon.png', text: '', redirect: 'https://www.webtoons.com/en/dailySchedule', newTab: true},
        {size, img: '', text: 'SLR daily chapter', redirect: this.SLR_DAILY_URL, newTab: true},
        ...this.tx(8, size),
        {
          size,
          img: '',
          text: 'Project documentation <i class="material-icons">lock</i>',
          redirect: 'https://docs.google.com/document/d/1IgnZucdU3wq-uBSizw7HuPyaE6IARr1bERef5x3M268/edit#heading=h.kqa87xz22s4m',
          newTab: true
        },
        {
          size,
          img: '',
          text: 'Arknight recruitment guide',
          redirect: 'https://aceship.github.io/AN-EN-Tags/akhr.html',
          newTab: true
        },
        {size, img: 'assets/bandcamp.png', text: '', redirect: 'bandcamp'},
        {size, text: 'stuff', redirect: 'loaders'},
        {size, text: 'stuff 2', redirect: 'entryScreen'},
        {size, text: 'stuff 3', redirect: 'menu1'},
        {size, text: 'stuff 4', redirect: 'terminal'},
        ...this.tx(9, size),
        {size, text: 'dev', redirect: 'dev'},
        ...this.tx(66, size),
      ]);
    } else {
      this.offsetX = 0.75 * size;
      this.offsetY = 1.04 * size * Math.sqrt(3) / 4;
      this.buttons = [];
      if (this.innerWidth / this.innerHeight < 1.8) {
        this.buttons.push(...this.tx(11, size));
      }
      if (this.innerWidth / this.innerHeight < 1.155) {
        this.buttons.push(...this.tx(11, size));
      }
      this.buttons.push(...[
        ...this.tx(13, size),
        {size, img: 'assets/youtube.png', redirect: 'youtube'},
        {size, img: 'assets/rer_b.png', redirect: 'rer'},
        {size, img: 'assets/TwitchPurple.png', text: '', redirect: 'twitch'},
        {size, img: 'assets/Processing.png', text: '', redirect: 'processing'},
        {size, img: 'assets/Swagger.png', text: '', redirect: environment.SWAGGER_URL, newTab: true},
        {size, img: 'assets/webtoon.png', text: '', redirect: 'https://www.webtoons.com/en/dailySchedule', newTab: true},
        {size, img: '', text: 'SLR daily chapter', redirect: this.SLR_DAILY_URL, newTab: true},
        ...this.tx(4, size),
        {
          size,
          img: '',
          text: 'Project documentation <i class="material-icons">lock</i>',
          redirect: 'https://docs.google.com/document/d/1IgnZucdU3wq-uBSizw7HuPyaE6IARr1bERef5x3M268/edit#heading=h.kqa87xz22s4m',
          newTab: true
        },
        {
          size,
          img: '',
          text: 'Arknight recruitment guide',
          redirect: 'https://aceship.github.io/AN-EN-Tags/akhr.html',
          newTab: true
        },
        {size, img: 'assets/bandcamp.png', text: '', redirect: 'bandcamp'},
        {size, text: 'stuff', redirect: 'loaders'},
        {size, text: 'stuff 2', redirect: 'entryScreen'},
        {size, text: 'stuff 3', redirect: 'menu1'},
        {size, text: 'stuff 4', redirect: 'terminal'},
        ...this.tx(4, size),
        {size, text: 'dev', redirect: 'dev'},
        ...this.tx(66, size),
      ]);
    }
  }


}
