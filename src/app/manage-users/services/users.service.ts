import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  delay,
  dematerialize,
  materialize,
  of,
  throwError,
} from 'rxjs';

import { users as mockUsers } from '../mocks/users.mock';
import { UpdateUser, User } from '../../core/interfaces/users.interface';
import { UsersUtils } from './users.utils';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = mockUsers.map((user) => ({ ...user }));

  public updateListSubject = new BehaviorSubject(null);

  public get updateList$(): Observable<null> {
    return this.updateListSubject.asObservable();
  }

  public getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(500));
  }

  public getUserById(id: number): Observable<User | null> {
    const user = this.users.find((user: User) => user.id === id);
    return of(user ? { ...user } : null).pipe(delay(500));
  }

  public create(user: UpdateUser): Observable<User> {
    const errors = UsersUtils.getServerErrors(user, this.users);
    if (Object.keys(errors).length) {
      return throwError(() => errors).pipe(
        materialize(),
        delay(200),
        dematerialize()
      );
    }

    const created = { ...user, id: +new Date() };
    this.users = [created, ...this.users];
    return of(created).pipe(delay(500));
  }

  public update(user: UpdateUser): Observable<User> {
    const errors = UsersUtils.getServerErrors(user, this.users);
    if (Object.keys(errors).length) {
      return throwError(() => errors).pipe(
        materialize(),
        delay(200),
        dematerialize()
      );
    }

    let updated = { ...user };
    this.users = this.users.map((item: User) => {
      if (item.id === user.id) {
        updated = { ...item, ...updated };
        return updated;
      }
      return item;
    });

    return of(updated).pipe(delay(500));
  }

  public delete(userId: number): Observable<null> {
    this.users = this.users.filter(({ id }) => id !== userId);
    return of(null).pipe(delay(500));
  }
}
