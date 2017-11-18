import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../app/type/type';
import { FormErrorHelper, ValidateHelper } from '../../../app/shared/validate.helper';
import { UserTransport } from '../../../app/transport';
import { Router } from '@angular/router';
import { ChannelService } from '../../service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  mainForm: FormGroup;
  constructor(private fb: FormBuilder,
              private userTransport: UserTransport,
              private router: Router,
              private channelService: ChannelService) {
    this.mainForm = this.fb.group({
      UserName: ['', [Validators.required] ],
      Password: ['', [Validators.required] ],
    });
  }
  onSubmit() {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    const user = this.mainForm.value as User;
    this.userTransport.login(user)
      .then(_d => {
        this.channelService.setUser(_d);
        this.router.navigate(['/trang-chu']);
      })
      .catch(err => {
        if (err.status === 400 && err._body && err._body.detail) {
          let detail = err._body.detail;
          FormErrorHelper.setServerError(this.mainForm , detail);
        }
      });
  }
}
