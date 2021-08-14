import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {selectLastRefreshTime} from './twitch.reducer';
import * as moment from 'moment';
import {Observable} from 'rxjs/internal/Observable';
import {first, map} from 'rxjs/operators';

@Injectable()
export class TwitchStoreService {

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
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

}
