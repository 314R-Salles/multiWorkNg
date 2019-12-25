import {createAction, props} from '@ngrx/store';
import {User} from '../models/user';

// export const add = createAction('[count] add', props<{ count: number }>());
export const setLoggedUser = createAction('[User] set logged user', props<{ user: User}>());
export const setSubscriptions = createAction('[Subscriptions] set subscriptions', props<{ subscriptions: User[]}>());
export const setLastRefreshTime = createAction('[Subscriptions] set last refresh time');




// const actions = union({
//   add,
// });

// export type TwitchActions = typeof actions;
