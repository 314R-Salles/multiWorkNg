import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';
import {Video} from './models/video';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';

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

  retrieveCompleteSubscriptions(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/streams');
  }

  getVideos(streamerId: string): Observable<Video[]> {
    return this.http.get<Video[]>(this.API_URL + '/user/' + streamerId + '/videos');
  }

  getPanelExtensions(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/extensions');
  }

  logout() {
    return this.http.post(this.API_URL + '/logout', null);
  }

}
