import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
    <ul *ngIf="shouldShowErrors()" class="alert alert-danger">
      <li style="list-style-type: none;" *ngFor="let error of listOfErrors()">{{error}}</li>
    </ul>
  `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Không thể để trống.',
    'email': () => 'Vui lòng nhập một địa chỉ mail',
    'minlength': (params) => `Phải có độ dài tối thiểu ${params.requiredLength} ký tự`,
    'maxlength': (params) => `Độ dài tối đa là ${params.requiredLength}`,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    /*'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message*/
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    if (ShowErrorsComponent.errorMessages[type]) {
      return ShowErrorsComponent.errorMessages[type](params);
    }
    return 'Không hợp lệ';
  }

}
