import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ManageUsersComponent,
  UserFormComponent,
  UserViewComponent,
  UsersListComponent,
} from './components';

import {
  InputComponent,
  LoaderComponent,
  SelectComponent,
} from '../shared/components';
import { ToastModule } from '../shared/modules/toast/toast.module';
import { CheckValidityDirective } from '../shared/directives';

@NgModule({
  declarations: [
    ManageUsersComponent,
    UserFormComponent,
    UserViewComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ToastModule,
    InputComponent,
    SelectComponent,
    LoaderComponent,
    CheckValidityDirective,
  ],
})
export class ManageUsersModule {}
