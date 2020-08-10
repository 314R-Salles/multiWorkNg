import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {selectExtensions, selectLastRefreshTime, selectLoggedUser, selectSubscriptions} from './twitch.reducer';
import {User} from '../models/user';
import * as moment from 'moment';
import {Extension} from '../models/extension';
import {Observable} from 'rxjs/internal/Observable';
import {first, map} from 'rxjs/operators';

@Injectable()
export class TwitchStoreService {

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getLoggedUser(): Observable<User> {
    return this.store.pipe(
      first(),
      map((state) => selectLoggedUser(state))
    );
  }

  spyOnLoggedUser(): Observable<User> {
    return this.store.pipe(
      map((state) => selectLoggedUser(state))
    );
  }

  getSubscriptions(): Observable<User[]> {
    return this.store.pipe(
      first(),
      map((state) => selectSubscriptions(state))
    );
  }

  spyOnSubscriptions(): Observable<User[]> {
    return this.store.pipe(
      map((state) => selectSubscriptions(state))
    );
  }

  getLastRefreshTime(): Observable<moment.Moment> {
    return this.store.pipe(
      first(),
      map((state) => selectLastRefreshTime(state))
    );
  }

  spyOnLastRefreshTime(): Observable<moment.Moment> {
    return this.store.pipe(
      map((state) => selectLastRefreshTime(state))
    );
  }

  getExtensions(): Observable<{ [id: string]: Extension[] }> {
    return this.store.pipe(
      first(),
      map((state) => selectExtensions(state))
    );
  }

  spyOnExtensions(): Observable<{ [id: string]: Extension[] }> {
    return this.store.pipe(
      map((state) => selectExtensions(state))
    );
  }

}
