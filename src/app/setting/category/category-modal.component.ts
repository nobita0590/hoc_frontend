import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectSource } from './../../type/setting-type';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormErrorHelper } from './../../shared/validate.helper';
import { SelectSourceTransport } from './../../transport/select-source.transport';

// import set = Reflect.set;

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}: {{category.name}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="mainForm" novalidate (submit)="onSubmit()" class="form-horizontal">
        <div class="form-group row">
          <label class="col-md-3 form-control-label">Tên</label>
          <div class="col-md-9">
            <input formControlName="Value"
                   type="text" name="Value" class="form-control" placeholder="Tên..">
            <show-errors [control]="mainForm.controls.Value" [fname]="'Tên'" ></show-errors>
          </div>
        </div>
        <!--<div class="form-group row">
          <label class="col-md-3 form-control-label" for="hf-password">Password</label>
          <div class="col-md-9">
            <input type="text" name="hf-password" class="form-control" placeholder="Enter Password..">
          </div>
        </div>-->
      </form>
    </div>
    <div class="modal-footer">
      <button [ladda]="isLoading" type="button" class="btn btn-success" (click)="onSubmit()">Cập nhật</button>
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `,
  providers: [SelectSourceTransport]
})
export class CategoryModalComponent implements OnInit {
  public title: string;
  public category: any = {};
  isLoading = false;
  mainForm: FormGroup;
  constructor(public bsModalRef: BsModalRef,
              private fb: FormBuilder,
              private selectSourceTransport: SelectSourceTransport) {
    this.mainForm = this.fb.group({
      Value: [this.source.Value, [Validators.required] ],
      ConvertedValue: [this.source.ConvertedValue ],
      GroupId: [this.source.GroupId ],
      // CategoryId: [this.source.CategoryId, Validators.required ],
      RelateId: [this.source.RelateId ]
    });
  }
  public source: SelectSource = new SelectSource();
  onSubmit(): void {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    this.isLoading = true;
    let model = this.mainForm.value as SelectSource;
    // this.blockUI.start();
    if (this.source.ID) {
      model.ID = this.source.ID
      this.selectSourceTransport.update(model)
        .then(id => {
          this.bsModalRef.hide();
          this.isLoading = false;
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.isLoading = false;
        });
    }else {
      this.selectSourceTransport.insert(model)
        .then(id => {
          this.bsModalRef.hide();
          this.isLoading = false;
        })
        .catch(err => {
          if (err.status === 400 && err._body && err._body.detail) {
            let detail = err._body.detail;
            FormErrorHelper.setServerError(this.mainForm , detail);
          }
          this.isLoading = false;
        });
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.mainForm.patchValue({
        Value: this.source.Value,
        ConvertedValue: this.source.ConvertedValue,
        GroupId: this.source.GroupId,
        // CategoryId: [this.source.CategoryId, Validators.required ],
        RelateId: this.source.RelateId,
      });
      if (this.source.ID) {
        this.title = 'Sửa danh mục';
      }else {
        this.title = 'Tạo danh mục';
      }
    }, 100);
  }
}
