import { Component, OnInit } from '@angular/core';
import { User, SelectSourceFilter } from '../../../app/type/type';
import { Helper } from '../../service';
import { SelectSourceTransport } from '../../../app/transport';

@Component({
  // tslint:disable-next-line
  selector: 'div[user-profile][class="col-sm-6 col-md-6 col-md-8"]',
  templateUrl: './profile.component.html',
  providers: [SelectSourceTransport],
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  provinces = [];
  constructor(private selectSourceTransport: SelectSourceTransport) {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }
  ngOnInit() {
    this.selectSourceTransport.getList({} as SelectSourceFilter)
      .then(source => {
        this.provinces = source;
      });
  }
  viewBirthDay() {
    return Helper.viewDate(new Date(this.user.Birthday));
  }
  viewProvince() {
    const province = this.provinces.find( e => {
      return e.ID == this.user.ProvinceId;
    });
    if (province) {
      return province.Value;
    }
    return '';
  }
  viewFacebook() {
    return '';
  }
  viewGender() {
    switch (this.user.Gender) {
      case 1: return 'Nam';
      case 2: return 'Nữ';
      default: return 'Khác';
    }
  }
}
