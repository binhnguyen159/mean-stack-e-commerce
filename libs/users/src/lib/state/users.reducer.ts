import {  EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';
import { User } from '../models/user';

export const USERS_FEATURE_KEY = 'users';

// create state
export interface UsersState {
  user: User;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  user: null,
  isAuthenticated: false
};

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.buildUserSession, (state) => ({ ...state })),
  on(UsersActions.loadUsersSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true
  })),
  on(UsersActions.loadUsersFailure, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false
  }))
);

// export const initialUsersState: UsersState = usersAdapter.getInitialState({
//   // set initial required properties
//   loaded: false
// });

// const reducer = createReducer(
//   initialUsersState,
//   on(UsersActions.initUsers, (state) => ({
//     ...state,
//     loaded: false,
//     error: null
//   })),
//   on(UsersActions.loadUsersSuccess, (state, { users }) =>
//     usersAdapter.setAll(users, { ...state, loaded: true })
//   ),
//   on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
// );

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
