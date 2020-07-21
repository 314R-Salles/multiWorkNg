import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('twitch');
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('twitch', token);
    }
    const authReq = req.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}
