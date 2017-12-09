import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../type';
import { ValidateHelper, FormErrorHelper } from './../../shared/validate.helper';
import { UserTransport } from './../../transport';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import { FlashAlert } from './../../shared/flash.alert';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [UserTransport]
})
export class CreateComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;

  userForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private userTransport: UserTransport,
              private route: Router,
              private flashAlert: FlashAlert) {
    this.userForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)] ],
      Email: ['', [Validators.required, ValidateHelper.email] ],
      Password: ['', Validators.required ],
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Phone: '',
      Class: '',
      School: '',
      Birthday: '',
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.userForm);
      return;
    }
    this.blockUI.start();
    this.userTransport.insert(this.userForm.value as User)
      .then(user => {
        this.blockUI.stop();
        this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Thêm mới tài khoản', 'Thêm mới tài khoản thành công');
        this.route.navigate(['admin/user']);
      })
      .catch(err => {
        if (err.status === 400 && err._body && err._body.detail) {
          let detail = err._body.detail;
          FormErrorHelper.setServerError(this.userForm , detail);
        }
        this.blockUI.stop();
      })
    console.log(this.userForm.value as User);
  }

  ngOnInit() {
  }

}
