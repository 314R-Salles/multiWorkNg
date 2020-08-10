import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bean} from './models/bean';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class MetricsHttpService {
  BASE_API = environment.JAVA_API;
  ACTUATORS_API = '/actuators';
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_API + this.ACTUATORS_API;
  }

  getBeans(): Observable<Bean[]> {
    return this.http.get<Bean[]>(this.API_URL + '/beans');
  }

}
