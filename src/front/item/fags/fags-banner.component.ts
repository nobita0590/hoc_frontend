import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperTransport } from '../../../app/transport';
import { Course } from '../../../app/type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'section[fagsBanner]',
  template: `
    <div class="container text-center">
      <h4 class="text-uppercase text-primary font-italic">Đăng câu hỏi và tham gia thảo luận cùng bạn bè!</h4>
      <p>Đội ngũ giao viên cùng cộng đồng TOPEDU sẽ cùng tham gia trở lời<br>và thảo luận nhanh nhất và chính xác nhất.</p>
      <a [routerLink]="['/trang-chu']" class="btn btn-success text-uppercase fa-lg mb-2 px-4 py-1">
        <i class="fa fa-send mr-2"></i> Đăng câu hỏi của bạn
      </a>
      <p class="font-italic">(Đặt câu hỏi và cùng tích điểm ngay nào ^^
        <a class="text-primary">Tìm hiểu thêm <i class="fa fa-question-circle"></i></a>)
      </p>
    </div>
  `,
  providers: []
})
export class FagsBannerComponent {
}
