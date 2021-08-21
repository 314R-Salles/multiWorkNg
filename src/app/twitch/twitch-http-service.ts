import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../shared/models/user';
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

  logout() {
    return this.http.post(this.API_URL + '/logout', null);
  }

}
