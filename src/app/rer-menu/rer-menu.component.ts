import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-rer-menu',
  templateUrl: './rer-menu.component.html',
  styleUrls: ['./rer-menu.component.css']
})
export class RerMenuComponent implements OnInit {

  tweets: any[];
  lastLevel;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(environment.JAVA_API + '/twitter/tweets/RERB').subscribe(tweets => {
      this.tweets = tweets.data;
      this.lastLevel = tweets.lastLevel;
    });
  }

}
