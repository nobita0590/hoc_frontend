import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserFilter } from './../../type/user-type';
import { ValidateHelper, FormErrorHelper } from './../../shared/validate.helper';
import { UserTransport } from './../../transport/user.transport';
import { HelperTransport } from './../../transport/helper.transport';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';
import { FlashAlert } from './../../shared/flash.alert';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  uploadUrl = HelperTransport.api('upload');

  userForm: FormGroup;
  user: User;
  sub: any;
  filter: UserFilter = new UserFilter();
  oldImgs: string[] = [];

  constructor(private fb: FormBuilder,
              private userTransport: UserTransport,
              private route: Router,
              private activeRoute: ActivatedRoute,
              private flashAlert: FlashAlert) {
    this.userForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(45)] ],
      Email: ['', [Validators.required, ValidateHelper.email] ],
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
    var user = this.userForm.value as User;
    user.ID = this.user.ID;
    user.AvatarUrl = this.user.AvatarUrl;
    this.userTransport.update(user)
      .then(userId => {
        this.blockUI.stop();
        this.flashAlert.flashAlert(FlashAlert.AlertSuccess, 'Sửa thông tin', 'Sửa thông tin tài khoản thành công');
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
    this.sub = this.activeRoute.params.subscribe(params => {
      this.filter.ID = +params['id'];
      this.userTransport.getA(this.filter)
        .then(user => {
          this.user = user;
          if (this.user.AvatarUrl) {
            this.oldImgs = [HelperTransport.imageUrl(this.user.AvatarUrl)];
          }
          this.userForm.setValue({
            UserName: user.UserName,
            Email: user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Phone: user.Phone,
            Class: user.Class,
            School: user.School,
            Birthday: user.Birthday
          });
        })
        .catch(err => {
          console.log(err);
          //this.route.navigate(['admin/user']);
        });
    });
    //this.userTransport()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onRemovedImage($e) {
    console.log('onRemovedImage:', $e);
  }
  onUploadFinished($e) {
    console.log('onUploadFinished', $e);
    if ($e.serverResponse && $e.serverResponse.status === 200) {
      try {
        let data = JSON.parse($e.serverResponse._body);
        if (data.status) {
          this.user.AvatarUrl = data.data.FilePath;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  onUploadStateChanged($e) {
    console.log('onUploadStateChanged', $e);
  }
}
