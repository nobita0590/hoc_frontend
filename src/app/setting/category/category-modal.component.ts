import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectSource } from './../../type/setting-type';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="mainForm" novalidate (submit)="onSubmit()" class="form-horizontal">
        <div class="form-group row">
          <label class="col-md-3 form-control-label" for="hf-email">Email</label>
          <div class="col-md-9">
            <input type="email" id="hf-email" name="hf-email" class="form-control" placeholder="Enter Email..">
            <span class="help-block">Please enter your email</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 form-control-label" for="hf-password">Password</label>
          <div class="col-md-9">
            <input type="password" id="hf-password" name="hf-password" class="form-control" placeholder="Enter Password..">
            <span class="help-block">Please enter your password</span>
          </div>
        </div>
      </form>
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="showSource()">Close</button>
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
})
export class CategoryModalComponent {
  public title: string;
  public list: any[] = [];
  mainForm: FormGroup;
  constructor(public bsModalRef: BsModalRef,
              private fb: FormBuilder) {
    this.mainForm = this.fb.group({
      Title: ['', [Validators.required] ],
      PrettyUrl: ['', [Validators.required] ],
      Description: ['', Validators.required ],
      CategoryId: ['', Validators.required ],
      Content: ['', Validators.required ]
    });
  }
  public source: SelectSource;
  showSource(): void {
    console.log(this.source);
  }
  onSubmit(): void {
    console.log(this.mainForm);
  }
}
