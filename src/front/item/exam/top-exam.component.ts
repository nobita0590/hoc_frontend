import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsTransport } from '../../../app/transport';
import { ExamsFilter } from '../../../app/type';
import { Helper } from '../../service/Helper';

@Component({
  selector: 'div[topExam]',
  styles: [`
    .title-mod-cont a.active{
      color: #090;
    }
  `],
  template: `
    <div *ngIf="isAds" class="ads">
      <a><img class="img-fluid" src="/public/frondtend/images/banner-4.jpg" width="100%"></a>
    </div>
    <div class="wrap-cup">
      <div class="title-mod">
        <div class="title-mod-cont">
          <img src="/public/frondtend/img/trophy.svg">
          <h4 class="text-uppercase text-shadow-white font-weight-normal">Bảng xếp hạng</h4>
          <ul>
            <li *ngFor="let m of monsView;let i = index" (click)="changeMonth(i)">
              <a class="action" [ngClass]="{active: i == currentIndex}">Tháng {{m.ViewNumber}}</a></li>
          </ul>
        </div>
      </div>
      <!-- END title -->
      <div class="cup-list">
        <table class="table table-cup">
          <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Tổng điểm</th>
            <th scope="col">Điểm TB</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let top of _tops;let i = index">
            <th scope="row">
              <span class="badge badge-pill" [ngClass]="{'badge-warning':i < 3,'badge-secondary': i > 2}">{{i + 1}}</span>
            </th>
            <td><a [routerLink]="['/nguoi-dung/dt',top.ID]">{{top.UserName}}</a></td>
            <td>{{top.TScore.toFixed(2)}}</td>
            <td>{{top.AvgScore.toFixed(2)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div *ngIf="isAds" class="ads">
      <a ><img class="img-fluid" src="/public/frondtend/images/banner-5.jpg" width="100%"></a>
    </div>
  `,
  providers: [TestsTransport]
})
export class TopExamComponent implements OnInit {
  _tops: TopTenUser[] = [];
  currentIndex = 0;
  monsView: TimeMonth[] = [];
  @Input()isAds = true;
  @Input()mons = 0;
  constructor(private testsTransport: TestsTransport) {
  }
  ngOnInit() {
    const current = new Date();
    let month = current.getMonth();
    let year = current.getFullYear();
    this.bindMonth(year, month, this.mons);
    this.currentIndex = this.monsView.length - 1;
    const currentDate = this.monsView[this.currentIndex];
    this.testsTransport.getTopTen(currentDate)
      .then(_d => {
        this._tops = _d;
      });
  }
  changeMonth(i: number) {
    if (i >= 0 && i < this.monsView.length) {
      this.currentIndex = i;
      this.testsTransport.getTopTen(this.monsView[i])
        .then(_d => {
          this._tops = _d;
        });
    }
  }
  viewDate(d: string) {
    return Helper.viewDate(new Date(d));
  }
  bindMonth(year, month, num) {
    const t = new TimeMonth();
    t.ViewNumber = month + 1;
    t.From = new Date(year, month, 1, 0, 0, 1);
    t.To = new Date(year, month + 1, 0, 23, 59, 59);
    this.monsView.unshift(t);
    if (num > 0) {
      if (month === 0) {
        this.bindMonth(year - 1, 11, num - 1);
      }else {
        this.bindMonth(year, month - 1, num - 1);
      }
    }
  }
}
export class TimeMonth extends ExamsFilter {
  ViewNumber: number;
}

export class TopTenUser {
  ID: number;
  TScore: number;
  AvgScore: number;
  UserName:	string;
}
