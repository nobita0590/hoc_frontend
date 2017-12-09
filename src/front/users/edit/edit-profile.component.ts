import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User, SelectSourceFilter } from '../../../app/type';
import { FrondTransport, SelectSourceTransport } from '../../../app/transport';
import { ValidateHelper, FormErrorHelper } from '../../../app/shared/validate.helper';
import { ChannelService } from '../../service';
import { FlashAlert } from '../../../app/shared/flash.alert';

@Component({
  // tslint:disable-next-line
  selector: 'div[user-edit-profile][class="col-sm-6 col-md-6 col-md-8"]',
  templateUrl: './edit-profile.component.html',
  providers: [FrondTransport, SelectSourceTransport]
})
export class EditProfileComponent implements OnInit {
  provinces = [];
  user: User = new User();
  mainForm: FormGroup;
  constructor(private frondTransport: FrondTransport,
              private selectSourceTransport: SelectSourceTransport,
              private fb: FormBuilder,
              private channelService: ChannelService,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.mainForm = this.fb.group({
      UserName: [this.user.UserName, [Validators.required, Validators.minLength(4), Validators.maxLength(45)] ],
      Email: [this.user.Email, [Validators.required, ValidateHelper.email] ],
      FirstName: [this.user.FirstName, Validators.required ],
      LastName: [this.user.LastName, Validators.required ],
      Phone: this.user.Phone,
      Class: this.user.Class,
      School: this.user.School,
      Birthday: new Date(this.user.Birthday),
      ProvinceId: this.user.ProvinceId,
      Gender: this.user.Gender
    });
  }
  ngOnInit() {
    this.selectSourceTransport.getList({
      GroupsId: [4],
    } as SelectSourceFilter)
      .then(_d => {
        this.provinces = _d;
      });
  }
  onSubmit() {
    if (this.mainForm.invalid) {
      FormErrorHelper.showErrorInvalid(this.mainForm);
      return;
    }
    const user = this.mainForm.value as User;
    user.ID = this.user.ID;
    this.frondTransport.updateUser(user)
      .then(_d => {
        this.user.FirstName = user.FirstName;
        this.user.LastName = user.LastName;
        this.user.Phone = user.Phone;
        this.user.Class = user.Class;
        this.user.School = user.School;
        this.user.Birthday = user.Birthday;
        this.user.ProvinceId = user.ProvinceId;
        this.user.Gender = user.Gender;
        this.channelService.setUser(this.user);
        this.channelService.flashAlert(FlashAlert.AlertSuccess, '', 'Cập nhật thông tin cá nhân thành công');
        this.router.navigate(['/nguoi-dung/toi']);
      });
  }
}
