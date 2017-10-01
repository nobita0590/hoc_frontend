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
    'required': (fname) => `${fname} không thể để trống.`,
    'email': (fname) => `${fname} phải là địa chỉ mail hợp lệ`,
    'minlength': (fname, params) => `${fname} phải có độ dài tối thiểu ${params.requiredLength} ký tự`,
    'maxlength': (fname, params) => `${fname} có độ dài tối đa là ${params.requiredLength}`,
    'pattern': (fname, params) => `The required pattern is: ${params.requiredPattern}`,
    'server': (fname, params) => {
      console.log(params);
      return `Loi tu server tra ve ${params}`;
    },
    /*'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message*/
  };

  @Input() control: AbstractControlDirective | AbstractControl;
  @Input() fname: string;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.errors.server || this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    // console.log(type, params)
    if (ShowErrorsComponent.errorMessages[type]) {
      return ShowErrorsComponent.errorMessages[type](this.fname, params);
    }
    return 'Không hợp lệ';
  }

}
