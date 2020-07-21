import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class BugReportHttpService {

  BASE_API = environment.JAVA_API;
  BUG_REPORT_API = '/bugReport';
  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = this.BASE_API + this.BUG_REPORT_API;
  }


  sendBugReport(app: string, data: string) {
    return this.http.post(this.API_URL, {image: data, fromApp: app}, {observe: 'response'});
  }

}
