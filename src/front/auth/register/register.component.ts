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
  providers: [ChannelService, FacebookService]
})
export class RegisterComponent {
  mainForm: FormGroup;
  constructor(private fb: FormBuilder,
              private facebook: FacebookService,
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
    const params: InitParams = {
      appId: '1192039274236789',
      version: 'v2.10'
    };
    this.facebook.init(params);
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
          const detail = err._body.detail;
          FormErrorHelper.setServerError(this.mainForm , detail);
        }
      });
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    };
  }
  loginFacebook() {
    this.facebook.login()
      .then((response: LoginResponse) => {
        console.log('Logged in', response);
        if (response.status === 'connected') {
        }
        this.userTransport.loginFacebook(response.authResponse.userID, response.authResponse.accessToken)
          .then(_d => {
            if (_d.status) {
              this.channelService.setUser(_d.data.user);
              this.router.navigate(['/trang-chu']);
            }
            console.log(_d);
          })
          .catch(e => {
            /*if (e.status == 400 && e._body && e._body.detail) {
              this.serverErr = e._body.detail;
            } else {
              this.serverErr = 'Lỗi Server. Vui lòng liên hệ ban quản trị!';
            }*/
          });
      })
      .catch(e => console.error('Error logging in'));
  }
}
