import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {first, map} from 'rxjs/operators';
import {ArduinoState, selectArduinoState, selectElements} from './arduino.reducer';
import {CircuitElement} from '../circuitElement';

@Injectable()
export class ArduinoStoreService {

  constructor(private store: Store<any>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  spyOnElements(): Observable<CircuitElement[]> {
    return this.store.pipe(
      map((state) => selectElements(state))
    );
  }

  getArduinoState(): Observable<ArduinoState> {
    return this.store.pipe(
      first(),
      map((state) => selectArduinoState(state))
    );
  }

}
