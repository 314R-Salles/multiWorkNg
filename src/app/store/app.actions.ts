import {createAction, props} from '@ngrx/store';
import {Meteo} from '../localization/geolocation-http.service';

export const savePlaylist = createAction('[User] set playlist', props<{ youtubePlaylistId: string }>());
export const setGoogleToken = createAction('[User] set google user token', props<{ googleToken: string }>());
export const setMeteo = createAction('[Meteo] set meteo', props<{ meteo: Meteo }>());
