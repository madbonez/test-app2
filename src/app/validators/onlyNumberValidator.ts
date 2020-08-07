/** A hero's name can't match the given regular expression */
import {AbstractControl, ValidatorFn} from '@angular/forms';

export function onlyNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return isNaN(control.value)  ? {numberOnly: true} : null;
  };
}
