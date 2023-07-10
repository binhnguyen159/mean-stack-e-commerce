import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[Users] Build users session');

export const loadUsersSuccess = createAction(
  '[Users] Build users session Success',
  props<{ user: User }>()
);

export const loadUsersFailure = createAction(
  '[Users] Build users session Failure'
);
