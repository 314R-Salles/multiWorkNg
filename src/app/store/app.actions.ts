import {createAction, props} from '@ngrx/store';

export const savePlaylist = createAction('[User] set playlist', props<{ youtubePlaylistId: string }>());
