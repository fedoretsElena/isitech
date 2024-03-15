import { AbstractControl, ValidationErrors } from '@angular/forms';

export function forbiddenPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const errors: ValidationErrors = {};
  const value = control.value;
  const minLength = 8;
  const hasCorrectLength = value?.length >= minLength;
  const hasOneNumberAndOneLetter =
    new RegExp(/\d/).test(value) && new RegExp(/[A-Z]/i).test(value);
  if (!hasCorrectLength) {
    errors['minLength'] = 'Min length is 8.';
  }

  if (!hasOneNumberAndOneLetter) {
    errors['noRequiredSymbols'] =
      'Password should have at least one number and one letter.';
  }

  return errors;
}
