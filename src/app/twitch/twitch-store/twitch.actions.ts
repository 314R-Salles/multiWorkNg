import {createAction, props} from '@ngrx/store';
import {User} from '../models/user';
import {Extension} from '../models/extension';

export const setLoggedUser = createAction('[User] set logged user', props<{ user: User }>());
export const setSubscriptions = createAction('[Subscriptions] set subscriptions', props<{ subscriptions: User[] }>());
export const setLastRefreshTime = createAction('[Subscriptions] set last refresh time');
export const setExtensions = createAction('[Subscriptions] set extensions', props<{ extensions: { [id: string]: Extension[] }}>());
