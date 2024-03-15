import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';

import { User } from '../../../core/interfaces/users.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  public loading = false;

  public users$: Observable<User[]> = this.usersService.updateList$.pipe(
    tap(() => (this.loading = true)),
    switchMap(() =>
      this.usersService.getUsers().pipe(tap(() => (this.loading = false)))
    )
  );

  constructor(private usersService: UsersService) {}

  public trackById(_: number, item: User): number {
    return item.id;
  }
}
