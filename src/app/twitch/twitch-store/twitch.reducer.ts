import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {setLastRefreshTime, setLoggedUser, setSubscriptions} from './twitch.actions';
import {User} from '../models/user';
import * as moment from 'moment';

export interface AppState {
  twitchState: TwitchState;
}

export interface TwitchState {
  loggedUser: User;
  subscriptions: User[];
  lastRefreshTime: moment.Moment;
}

export const initialState: TwitchState = {
  loggedUser: null,
  subscriptions: null,
  lastRefreshTime: null,
};

const _twitchReducer = createReducer(
  initialState,
  on(setLoggedUser, (state, {user}) => ({...state, loggedUser: user})),
  on(setSubscriptions, (state, {subscriptions}) => ({...state, subscriptions})),
  on(setLastRefreshTime, (state) => ({...state, lastRefreshTime: moment()})),
);

export function twitchReducer(state: TwitchState, action: Action) {
  console.log(action, state);
  return _twitchReducer(state, action);
}

export const selectTwitchState = (state: AppState) => state.twitchState;

export const selectLoggedUser = createSelector(
  selectTwitchState,
  (state: TwitchState) => {
    return (state ? state.loggedUser : null);
  });

export const selectSubscriptions = createSelector(
  selectTwitchState,
  (state: TwitchState) => {
    return (state ? state.subscriptions : []);
  });

export const selectLastRefreshTime = createSelector(
  selectTwitchState,
  (state: TwitchState) => {
    return (state ? state.lastRefreshTime : null);
  });

