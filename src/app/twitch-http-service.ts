import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Stream} from './models/stream';
import {User} from './models/user';
import {Video} from './models/video';
import {Observable} from 'rxjs/index';

@Injectable()
export class TwitchHttpService {

  BASE_API = 'http://localhost:8080/';
  TWITCH_API = '/twitch';
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_API + this.TWITCH_API;
  }

  login(token: string): Observable<any> {
    return this.http.post(this.API_URL + '/login', token);
  }

  retrieveMyUser(): Observable<User> {
    return this.http.get<User>(this.API_URL + '/getMyUser');
  }

  retrieveSubscriptions(userId: string): Observable<Stream[]> {
    return this.http.get<Stream[]>(this.API_URL + '/streams/user/' + userId);
  }

  retrieveCompleteSubscriptions(userId: string): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/streams/user/' + userId + '/2');
  }

  getVideos(userId: string): Observable<Video[]> {
    return this.http.get<Video[]>(this.API_URL + '/user/' + userId + '/videos');
  }

}
