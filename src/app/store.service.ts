import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {
  AppState,
  selectExtensions,
  selectLastRefreshTime,
  selectLoggedUser,
  selectSubscriptions
} from './twitch/twitch-store/twitch.reducer';
import {User} from './twitch/models/user';
import * as moment from 'moment';
import {Extension} from './twitch/models/extension';
import {Observable} from 'rxjs/internal/Observable';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store<AppState>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getLoggedUser(): Observable<User> {
    return this.store.pipe(
      first(),
      map((state: AppState) => selectLoggedUser(state))
    );
  }

  spyOnLoggedUser(): Observable<User> {
    return this.store.pipe(
      map((state: AppState) => selectLoggedUser(state))
    );
  }

  getSubscriptions(): Observable<User[]> {
    return this.store.pipe(
      first(),
      map((state: AppState) => selectSubscriptions(state))
    );
  }

  spyOnSubscriptions(): Observable<User[]> {
    return this.store.pipe(
      map((state: AppState) => selectSubscriptions(state))
    );
  }

  getLastRefreshTime(): Observable<moment.Moment> {
    return this.store.pipe(
      first(),
      map((state: AppState) => selectLastRefreshTime(state))
    );
  }

  spyOnLastRefreshTime(): Observable<moment.Moment> {
    return this.store.pipe(
      map((state: AppState) => selectLastRefreshTime(state))
    );
  }

  getExtensions(): Observable<{ [id: string]: Extension[] }> {
    return this.store.pipe(
      first(),
      map((state: AppState) => selectExtensions(state))
    );
  }

  spyOnExtensions(): Observable<{ [id: string]: Extension[] }> {
    return this.store.pipe(
      map((state: AppState) => selectExtensions(state))
    );
  }


}
