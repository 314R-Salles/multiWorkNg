import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {selectLastRefreshTime} from './twitch-store/twitch.reducer';
import {selectGoogleToken, selectMeteo, selectPlaylistId} from './app.reducer';
import {Meteo} from '../localization/geolocation-http.service';

@Injectable()
export class AppStoreService {

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  spyOnLastRefreshTime(): Observable<moment.Moment> {
    return this.store.pipe(
      map((state) => selectLastRefreshTime(state))
    );
  }

  spyOnPlaylistId(): Observable<string> {
    return this.store.pipe(
      map((state) => selectPlaylistId(state))
    );
  }

  getGoogleToken(): Observable<string> {
    return this.store.pipe(
      map((state) => selectGoogleToken(state))
    );
  }

  getMeteo(): Observable<Meteo> {
    return this.store.pipe(
      map((state) => selectMeteo(state))
    );
  }

}
