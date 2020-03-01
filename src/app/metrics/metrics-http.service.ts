import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Bean} from './models/bean';

@Injectable({
  providedIn: 'root'
})
export class MetricsHttpService {
  BASE_API = 'http://51.178.84.104:8080/';
  ACTUATORS_API = '/actuators';
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_API + this.ACTUATORS_API;
  }

  getBeans(): Observable<Bean[]> {
    return this.http.get<Bean[]>(this.API_URL + '/beans');
  }

}
