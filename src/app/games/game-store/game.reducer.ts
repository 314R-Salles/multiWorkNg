import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {setLevelKey, setLockerCardState, setRedCardState} from './game.actions';

export interface GameState {
  // to navigate to unlocked levels, utiliser un cookie pour stocker la clé.
  levelKey: string;
  redCard: RedCardState;
  lockerCard: LockerCardState;
}

export interface RedCardState {
  id: string;
  password: string;
}

export interface LockerCardState {
  lockerNumber: string;
}

export const initialState: GameState = {
  levelKey: 'level1', // utiliser un uuid
  redCard: undefined, // use of undefined, to hide unnecessary fields
  lockerCard: undefined,
};

const _gameReducer = createReducer(
  initialState,
  on(setRedCardState, (state, {newState}) => ({...state, redCard: {...newState}})),
  on(setLockerCardState, (state, {newState}) => ({...state, lockerCard: {...newState}})),
  on(setLevelKey, (state, {key}) => ({...state, levelKey: key})),
);

export function gameReducer(state: GameState, action: Action) {
  return _gameReducer(state, action);
}

export const selectGameState = (state: any) => state.game.gameState;

export const selectRedCard = createSelector(
  selectGameState,
  (state: GameState) => {
    return (state ? state.redCard : null);
  });

export const selectLockerCard = createSelector(
  selectGameState,
  (state: GameState) => {
    return (state ? state.lockerCard : null);
  });
