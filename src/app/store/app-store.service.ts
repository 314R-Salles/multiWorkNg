import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {selectLastRefreshTime} from './twitch-store/twitch.reducer';
import {selectPlaylistId} from './app.reducer';

@Injectable()
export class AppStoreService {

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  // Exemple avec un pipe first intégré.
  // getLastRefreshTime(): Observable<moment.Moment> {
  //   return this.store.pipe(
  //     first(),
  //     map((state) => selectLastRefreshTime(state))
  //   );
  // }

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

}
