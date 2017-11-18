import { FormControl, AbstractControl, FormGroup } from '@angular/forms';
export class ValidateHelper {
  static email(control: FormControl) {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'email': true };
    }
  }
  static numberRequired(control: FormControl) {
    if (control.value && control.value != 0) {
      return null;
    } else {
      return { required: true };
    }
  }
}

export class FormErrorHelper {
  static showErrorInvalid(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.showErrorInvalid(control);
      }
    });
  }
  static setServerError(form: FormGroup, errMessage: Object) {
    Object.keys(errMessage).forEach(field => {
      const control = form.get(field);
      if (errMessage[field] instanceof Object && control instanceof FormGroup) {
        this.setServerError(control, errMessage[field]);
      }else if (typeof(errMessage[field]) === 'string' && control instanceof FormControl) {
        control.setErrors({ 'server': errMessage[field]});
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
