import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-button-display',
  templateUrl: './button-display.component.html',
  styleUrls: ['./button-display.component.css']
})
export class ButtonDisplayComponent implements OnInit {

  math = Math;

  buttons = [
    {size: 8, img: 'assets/youtube.png', redirect: 'youtube'},
    {size: 8, img: 'assets/rer_b.png', redirect: 'rer'},
    {size: 8, img: 'assets/TwitchPurple.png', text: '', redirect: 'twitch'},
    {size: 8, img: 'assets/Processing.png', text: '', redirect: 'processing'},
    {size: 8, img: 'assets/Swagger.png', text: '', redirect: environment.SWAGGER_URL, newTab: true},
    {size: 8, img: 'assets/webtoon.png', text: '', redirect: 'https://www.webtoons.com/en/dailySchedule', newTab: true},
    {size: 8, img: '', text: '', redirect: 'home'},
    {size: 8, img: '', text: '', redirect: 'home'},
    {size: 8, img: '', text: '', redirect: 'home'},
    {size: 8, img: '', text: '', redirect: 'home'},
  ];


  constructor() {
  }

  ngOnInit(): void {
  }

}
