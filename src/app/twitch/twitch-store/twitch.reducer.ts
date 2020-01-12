import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {setExtensions, setLastRefreshTime, setLoggedUser, setSubscriptions} from './twitch.actions';
import {User} from '../models/user';
import * as moment from 'moment';
import {Extension} from '../models/extension';

export interface AppState {
  twitchState: TwitchState;
}

export interface TwitchState {
  loggedUser: User;
  subscriptions: User[];
  lastRefreshTime: moment.Moment;
  extensions: { [id: string]: Extension[] };
}

export const initialState: TwitchState = {
  loggedUser: null,
  subscriptions: null,
  lastRefreshTime: null,
  extensions: null,
};

const _twitchReducer = createReducer(
  initialState,
  on(setLoggedUser, (state, {user}) => ({...state, loggedUser: user})),
  on(setSubscriptions, (state, {subscriptions}) => ({...state, subscriptions})),
  on(setLastRefreshTime, (state) => ({...state, lastRefreshTime: moment()})),
  on(setExtensions, (state, {extensions}) => ({...state, extensions}))
);

export function twitchReducer(state: TwitchState, action: Action) {
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

export const selectExtensions = createSelector(
  selectTwitchState,
  (state: TwitchState) => {
    return (state ? state.extensions : {});
  });

