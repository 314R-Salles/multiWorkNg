import {createAction, props} from '@ngrx/store';
import {User} from '../models/user';

export const setLoggedUser = createAction('[User] set logged user', props<{ user: User }>());
export const setSubscriptions = createAction('[Subscriptions] set subscriptions', props<{ subscriptions: User[] }>());
export const setLastRefreshTime = createAction('[Subscriptions] set last refresh time');
