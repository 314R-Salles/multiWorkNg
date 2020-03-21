import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';
import {Video} from './models/video';
import {Observable} from 'rxjs/index';
import {environment} from '../../environments/environment';

@Injectable()
export class TwitchHttpService {

  BASE_API = environment.JAVA_API;
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
