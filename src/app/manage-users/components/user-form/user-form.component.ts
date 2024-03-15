import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  User,
  UserType,
  UpdateUser,
  userTypeToUIMapper,
  ServerErrors,
} from '../../../core/interfaces';

import { SelectOption } from '../../../shared/components/select';
import { forbiddenPasswordValidator } from '../../../shared/validators/forbidden-password';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnChanges {
  @Input() public user?: User;
  @Input() public serverErrors?: ServerErrors;

  @Output() public delete: EventEmitter<number> = new EventEmitter();
  @Output() public save: EventEmitter<UpdateUser> = new EventEmitter();

  public typesOptions: SelectOption<UserType>[] = [
    UserType.Admin,
    UserType.Driver,
  ].map((type: UserType) => ({
    value: type,
    name: userTypeToUIMapper[type],
  }));

  constructor(private fb: FormBuilder) {}

  public userForm: FormGroup = this.fb.group({
    id: '',
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    userType: ['', Validators.required],
    password: ['', [Validators.required, forbiddenPasswordValidator]],
    password2: ['', [Validators.required, forbiddenPasswordValidator]],
  });

  public ngOnChanges(changes: SimpleChanges): void {
    const { user, serverErrors } = changes;

    if (user?.currentValue) {
      this.userForm.patchValue({
        ...user.currentValue,
        password2: user.currentValue.password,
      });
    }

    if (serverErrors?.currentValue) {
      this.attachErrorsToControls(serverErrors.currentValue);
    }
  }

  public onSave(): void {
    this.save.emit(this.userForm.value);
  }

  public onDelete(): void {
    this.delete.emit(this.user!.id);
  }

  private attachErrorsToControls(errors: ServerErrors): void {
    for (let fieldName in errors) {
      this.userForm.get(fieldName)?.setErrors(errors[fieldName]);
    }
  }
}
