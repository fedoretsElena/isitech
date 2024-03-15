import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subscription,
  distinctUntilKeyChanged,
  finalize,
  iif,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { UpdateUser, ServerErrors, User } from '../../../core/interfaces';
import { UsersService } from '../../services/users.service';
import { ToastService, ToastType } from '../../../shared/modules/toast';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
})
export class UserViewComponent implements OnInit, OnDestroy {
  public user?: User;

  public loading = false;
  public serverErrors?: ServerErrors;

  private routeSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private toastService: ToastService
  ) {}

  public ngOnInit(): void {
    this.routeSubscription = this.route.params
      .pipe(
        distinctUntilKeyChanged('id'),
        tap(() => (this.loading = true)),
        switchMap(({ id }) =>
          iif(
            () => !!id,
            this.usersService.getUserById(+id).pipe(
              tap((user: User | null) => {
                if (!user) {
                  this.router.navigate(['./edit', id, 'not-found']);
                }
              })
            ),
            of(null)
          )
        )
      )
      .subscribe((user: User | null) => {
        this.loading = false;
        this.user = user ? { ...user } : undefined;
      });
  }

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onSave(data: UpdateUser): void {
    this.user ? this.update(data) : this.create(data);
  }

  onDelete(userId: number): void {
    this.loading = true;
    this.usersService.delete(userId).subscribe(() => {
      this.usersService.updateListSubject.next(null);
      this.toastService.show({
        text: 'User was successfully deleted.',
        type: ToastType.Success,
      });
      this.router.navigate(['']);
    });
  }

  private create(user: UpdateUser): void {
    this.loading = true;
    this.usersService
      .create(user)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (user: User) => {
          this.usersService.updateListSubject.next(null);
          this.serverErrors = {};
          this.toastService.show({
            text: 'User was successfully created.',
            type: ToastType.Success,
          });
          this.router.navigate(['./', 'edit', user.id]);
        },
        error: (errors: ServerErrors) => {
          this.serverErrors = { ...errors };
          this.toastService.show({
            text: 'Validation failed.',
            type: ToastType.Fail,
          });
        },
      });
  }

  private update(user: UpdateUser): void {
    this.loading = true;
    this.usersService
      .update(user)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.usersService.updateListSubject.next(null);
          this.serverErrors = {};
          this.toastService.show({
            text: 'User was successfully updated.',
            type: ToastType.Success,
          });
        },
        error: (errors: ServerErrors) => {
          this.serverErrors = { ...errors };
          this.toastService.show({
            text: 'Validation failed.',
            type: ToastType.Fail,
          });
        },
      });
  }
}
