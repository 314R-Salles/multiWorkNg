import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {AppState, selectLastRefreshTime, selectLoggedUser, selectSubscriptions} from './twitch/twitch-store/twitch.reducer';
import {first, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {User} from './twitch/models/user';
import * as moment from 'moment';

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


}
