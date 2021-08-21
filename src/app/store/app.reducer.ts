import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {savePlaylist} from './app.actions';
import {twitchReducer} from './twitch-store/twitch.reducer';


export interface RootState {
  youtubePlaylistId;
}

export const initialState: RootState = {
  youtubePlaylistId: null,
};

const _rootReducer = createReducer(
  initialState,
  on(savePlaylist, (state, {youtubePlaylistId}) => ({...state, youtubePlaylistId})),
);

export function appReducer(state: RootState, action: Action) {
  return _rootReducer(state, action);
}

export const selectRootState = (state: any) => state.rootState;

export const selectPlaylistId = createSelector(
  selectRootState,
  (state: RootState) => {
    return (state ? state.youtubePlaylistId : null);
  });


export const reducers = {
  rootState: appReducer,
  twitch: twitchReducer
};
