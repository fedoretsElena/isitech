import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ManageUsersModule } from './manage-users/manage-users.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ManageUsersModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
