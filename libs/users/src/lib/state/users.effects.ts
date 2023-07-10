import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {  catchError, of, concatMap, map } from 'rxjs';
import * as UsersActions from './users.actions';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  // private actions$ = inject(Actions);
  constructor(
    private actions$: Actions,
    private localstorageService: LocalstorageService,
    private usersService: UsersService
  ) {}

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UsersActions.initUsers),
  //     switchMap(() => of(UsersActions.loadUsersSuccess({ users: [] }))),
  //     catchError((error) => {
  //       console.error('Error', error);
  //       return of(UsersActions.loadUsersFailure({ error }));
  //     })
  //   )
  // );

  buildUserSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localstorageService.isValidToken()) {
          const userId = this.localstorageService.getUserIdFromToken();
          if (!userId) return of(UsersActions.loadUsersFailure());
          return this.usersService.getDetailUser(userId).pipe(
            map((user) => {
              return UsersActions.loadUsersSuccess({ user });
            }),
            catchError(() => {
              return of(UsersActions.loadUsersFailure());
            })
          );
        } else {
          return of(UsersActions.loadUsersFailure());
        }
      })
    )
  );
}
