import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  BASE_API = 'http://51.178.84.104:8080';
  TWITCH_API = '/home';
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_API + this.TWITCH_API;
  }

  getHomeVideos() {
    return this.http.get<{url: string}[]>(this.API_URL + '/videos');
  }
}
