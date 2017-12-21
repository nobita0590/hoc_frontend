import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FagsTransport } from '../../../app/transport';
import { Fags, FagsFilter } from '../../../app/type';

@Component({
  selector: 'div[fagHotItem]',
  template: `
    <div class="sidebar">

      <!-- ads sidebar -->
      <div *ngIf="isAds" class="ads">
        <a><img class="img-fluid" src="/public/frondtend/images/banner-4.jpg" width="100%"></a>
      </div>
      <!-- END ads sidebar -->

      <!-- module sidebar -->
      <div class="mod-sidebar">
        <div class="title-mod">
          <div class="title-mod-cont">
            <img src="public/frondtend/img/starfish.svg">
            <h4 class="text-uppercase text-shadow-white font-weight-normal">Chủ đề nóng</h4>
          </div>
        </div>
        <!-- END title -->
        <div class="topic-cont">
          <ul class="list-topic-style-1 list-topic-style-2">
            <li *ngFor="let fag of fags">
              <img src="/public/frondtend/img/starfish.svg">
              <h3>
                <a [routerLink]="['/hoi-dap',fag.PrettyUrl,fag.ID]">{{fag.Title}}</a>
              </h3>
              <p class="mb-0">
                <a class="subjects-of-topic">- {{fag.SubjectName}}</a>
                <span class="author-of-topic"> <i class="fa fa-comment-o"></i> {{fag.CommentsNumber}} bình luận</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <!-- END module sidebar -->
    </div>
  `,
  providers: [FagsTransport]
})
export class FagsHotItemComponent implements OnInit {
  @Input()isAds = true;
  fags: Fags[] = [];
  constructor(private fagsTransport: FagsTransport) {}
  ngOnInit() {
    const filter = new FagsFilter();
    filter.Rows = 5;
    filter.IsHot = true;
    this.fagsTransport.getList(filter)
      .then(_d => {
        this.fags = _d.models;
      });
  }
}
