import {createAction, props} from '@ngrx/store';
import {LockerCardState, RedCardState} from './game.reducer';

export const setRedCardState = createAction('[Game] set red card data', props<{ newState: RedCardState }>());
export const setLockerCardState = createAction('[Game] set locker card data', props<{ newState: LockerCardState }>());
export const setLevelKey = createAction('[Game] set level key', props<{ key: string }>());
