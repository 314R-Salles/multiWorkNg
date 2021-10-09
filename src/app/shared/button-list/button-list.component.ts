import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-button-list',
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.css']
})
export class ButtonListComponent {

  math = Math;
  currentRoute;

  buttons = [
    {size: 8, img: 'assets/youtube.png', redirect: 'youtube'},
    {size: 8, img: 'assets/rer_b.png', redirect: 'rer'},
    {size: 8, img: 'assets/TwitchPurple.png', text: '', redirect: 'twitch'},
    {size: 8, img: 'assets/Processing.png', text: '', redirect: 'processing'},
    {size: 8, img: 'assets/Swagger.png', text: '', redirect: environment.SWAGGER_URL, newTab: true},
    {size: 8, img: '', text: '', redirect: 'home'},
    {size: 8, img: '', text: '', redirect: 'home'},
    {size: 8, img: '', text: '', redirect: 'home'},
    {size: 8, img: '', text: '', redirect: 'home'},
    {size: 8, img: '', text: '', redirect: 'home'},
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        this.currentRoute = (<NavigationEnd> event).urlAfterRedirects.substring(1);
      });


  }
}
