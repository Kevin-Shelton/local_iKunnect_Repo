import { AbstractControl } from '@angular/forms';

export const noWhitespaceValidator = function (control: AbstractControl) {
  if ((control.value ?? '').length) {
    return (control.value ?? '').trim().length ? null : { whitespace: true };
  }
  return null;
};
