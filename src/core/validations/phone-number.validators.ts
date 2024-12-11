import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { REGEX_PATTERNS } from '../../config/env-config';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value) return null;
    const isValid = REGEX_PATTERNS.PHONE_NUMBER_PATTERN.test(control.value);
    return isValid ? null : { invalidPhoneNumber: true };
  };
}
