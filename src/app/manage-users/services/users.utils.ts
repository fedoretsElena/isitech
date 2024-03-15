import { ServerErrors, UpdateUser, User } from '../../core/interfaces';

export class UsersUtils {
  public static getServerErrors(user: UpdateUser, users: User[]): ServerErrors {
    const errors: ServerErrors = {};

    if (UsersUtils.checkUniqueUsername(user, users)) {
      errors['username'] = {
        unique: 'Username should be unique.',
      };
    }

    if (!UsersUtils.checkMatchPasswords(user)) {
      errors['password2'] = {
        mismatch: 'Password do not match.',
      };
    }

    return errors;
  }

  private static checkUniqueUsername(
    { id, username }: UpdateUser,
    users: User[]
  ): boolean {
    return users.some(
      (item) =>
        item.id !== id && item.username.toLowerCase() === username.toLowerCase()
    );
  }

  private static checkMatchPasswords({
    password,
    password2,
  }: UpdateUser): boolean {
    return password.trim() === password2.trim();
  }
}
