import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../app/type/type';
import { FormErrorHelper, ValidateHelper } from '../../../app/shared/validate.helper';
import { UserTransport } from '../../../app/transport';
import { Router } from '@angular/router';
import { ChannelService } from '../../service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  providers: [ChannelService]
})
export class RegisterComponent {
  mainForm: FormGroup;
  constructor(private fb: FormBuilder,
              private userTransport: UserTransport,
              private router: Router,
              private channelService: ChannelService) {
    this.mainForm = this.fb.group({
      UserName: ['', [Validators.required] ],
      Email: ['', [Validators.required, ValidateHelper.email] ],
      FirstName: ['', Validators.required ],
      LastName: ['', Validators.required ],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6)]) ],
      RePassword: [''],
    }, {validator: this.matchingPasswords('Password', 'RePassword')});
    eval('window.f = this.mainForm');
  }
  onSubmit() {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    const user = this.mainForm.value as User;
    this.userTransport.register(user)
      .then(_d => {
        this.channelService.setUser(user)
        this.router.navigate(['/trang-chu']);
      })
      .catch(err => {
        if (err.status === 400 && err._body && err._body.detail) {
          let detail = err._body.detail;
          FormErrorHelper.setServerError(this.mainForm , detail);
        }
      });
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }
}
