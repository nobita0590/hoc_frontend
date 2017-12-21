import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTransport, HelperTransport } from '../../app/transport';
import { Documents, DocumentFilter } from '../../app/type';

@Component({
  selector: 'div[docTopUser]',
  template: `
    <div class="ads">
      <a><img class="img-fluid" src="/public/frondtend/images/banner-4.jpg" width="100%"></a>
    </div>
    <!-- END ads sidebar -->
    <div class="wrap-cup">
      <div class="title-mod">
        <div class="title-mod-cont">
          <img src="/public/frondtend/img/trophy.svg">
          <h4 class="text-uppercase text-shadow-white font-weight-normal">Bảng xếp hạng</h4>
        </div>
      </div>
      <!-- END title -->
      <div class="cup-list">
        <table class="table table-cup">
          <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Điểm</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row"><span class="badge badge-pill badge-warning">1</span></th>
            <td><a href="">Lê Khánh Huyền</a></td>
            <td>1.265</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- ads sidebar -->
    <div class="ads">
      <a><img class="img-fluid" src="/public/frondtend/images/banner-5.jpg" width="100%"></a>
    </div>
  `,
  providers: [DocumentTransport]
})
export class TopUserComponent implements OnInit {
  doc = new Documents();
  @Output()onPageChange = new EventEmitter<number>();
  constructor(private documentTransport: DocumentTransport,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
  }
}
