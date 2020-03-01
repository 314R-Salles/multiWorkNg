import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';
import {Video} from './models/video';
import {Observable} from 'rxjs/index';

@Injectable()
export class TwitchHttpService {

  // TODO A passer dans environment.ts
  BASE_API = 'http://51.178.84.104:8080';
  TWITCH_API = '/twitch';
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_API + this.TWITCH_API;
  }

  retrieveMyUser(): Observable<User> {
    return this.http.get<User>(this.API_URL + '/getMyUser');
  }

  retrieveCompleteSubscriptions(userId: string): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/streams/user/' + userId);
  }

  getVideos(userId: string): Observable<Video[]> {
    return this.http.get<Video[]>(this.API_URL + '/user/' + userId + '/videos');
  }

  getPanelExtensions(userId: string): Observable<any> {
    return this.http.get<any>(this.API_URL + '/extensions/user/' + userId);
  }

}
