import {Action, createReducer, createSelector, on} from '@ngrx/store';
import {removeBandcampAlbumId, savePlaylist, setBandcampAlbumId, setGoogleToken, setMeteo} from './app.actions';
import {twitchReducer} from './twitch-store/twitch.reducer';
import {Meteo} from '../localization/geolocation-http.service';


export interface RootState {
  youtubePlaylistId;
  googleToken;
  meteo: Meteo;
  bandcampAlbumId: string;
}

export const initialState: RootState = {
  youtubePlaylistId: null,
  googleToken: null,
  meteo: null,
  bandcampAlbumId: null,
};

const _rootReducer = createReducer(
  initialState,
  on(savePlaylist, (state, {youtubePlaylistId}) => ({...state, youtubePlaylistId})),
  on(setGoogleToken, (state, {googleToken}) => ({...state, googleToken})),
  on(setMeteo, (state, {meteo}) => ({...state, meteo})),
  on(setBandcampAlbumId, (state, {bandcampAlbumId}) => ({...state, bandcampAlbumId})),
  on(removeBandcampAlbumId, (state) => ({...state, bandcampAlbumId: null})),
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

export const selectGoogleToken = createSelector(
  selectRootState,
  (state: RootState) => {
    return (state ? state.googleToken : null);
  });

export const selectMeteo = createSelector(
  selectRootState,
  (state: RootState) => {
    return (state ? state.meteo : null);
  });

export const selectBandcampAlbumId = createSelector(
  selectRootState,
  (state: RootState) => {
    return (state ? state.bandcampAlbumId : null);
  });


export const reducers = {
  rootState: appReducer,
  twitch: twitchReducer
};
