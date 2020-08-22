import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {LockerCardState, RedCardState, selectLockerCard, selectRedCard} from './game.reducer';
import {first, map} from 'rxjs/operators';

@Injectable()
export class GameStoreService {

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  getRedCardState(): Observable<RedCardState> {
    return this.store.pipe(
      first(),
      map((state) => selectRedCard(state))
    );
  }

  getLockerCardState(): Observable<LockerCardState> {
    return this.store.pipe(
      first(),
      map((state) => selectLockerCard(state))
    );
  }

}
