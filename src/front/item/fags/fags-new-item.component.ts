import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FagsTransport } from '../../../app/transport';
import { Fags, FagsFilter } from '../../../app/type';

@Component({
  selector: 'div[fagNewItem]',
  template: `
    <div class="mod-sidebar">
      <div class="title-mod">
        <div class="title-mod-cont">
          <h4 class="text-uppercase text-shadow-white font-weight-normal">Thảo luận - Câu hỏi mới</h4>
        </div>
      </div>
      <div class="topic-cont">
        <ul class="list-topic-style-1">
          <li *ngFor="let fag of fags">
            <img src="public/frondtend/img/question.png">
            <h3>
              <a [routerLink]="['/hoi-dap',fag.PrettyUrl,fag.ID]">{{fag.Title}}</a>
            </h3>
            <p class="mb-0">
              <a class="subjects-of-topic" [routerLink]="['/hoi-dap']" [queryParams]="{s: fag.SubjectId}">- {{fag.SubjectName}}</a>
              <span class="author-of-topic"> <i class="fa fa-user-circle"></i> {{fag.UserName}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  `,
  providers: [FagsTransport]
})
export class FagsNewItemComponent implements OnInit {
  // @Input()isAds = true;
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
