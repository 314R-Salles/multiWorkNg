import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  BASE_API = environment.JAVA_API;
  HOME_API = '/home';
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_API + this.HOME_API;
  }

  getHomeVideos() {
    return this.http.get<{url: string}[]>(this.API_URL + '/videos');
  }
}
