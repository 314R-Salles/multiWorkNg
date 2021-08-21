import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('twitch');
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('twitch', token);
    }
    const authReq = req.clone({headers: newHeaders});
    return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.url.includes('twitch')) {
        localStorage.removeItem('twitch');
        location.reload();
      }
      return throwError(error);
    }));
  }

}
