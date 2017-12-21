import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperTransport } from '../../../app/transport';
import { Fags } from '../../../app/type';
import { Helper } from '../../service/Helper';

@Component({
  selector: 'li[fagItem]',
  template: `
    <h3>
      <img src="/public/frondtend/img/question.png">
      <a [routerLink]="['/hoi-dap',fag.PrettyUrl,fag.ID]">{{fag.Title}}</a></h3>
    <p class="mb-0">
      <a class="subjects-of-topic">- {{fag.SubjectName}}</a>
      <a class="badge badge-info ml-2">{{fag.ClassName}}</a>
      <span class="author-of-topic"> <i class="fa fa-user-circle"></i> {{fag.UserName}}</span>
      <small class="pull-right text-secondary">{{viewDate(fag.CreatedAt)}}</small>
    </p>
  `,
  providers: []
})
export class FagsItemComponent {
  _item: Fags;
  get fag(): Fags{
    return this._item;
  }
  @Input()
  set fag(item: Fags) {
    this._item = item;
  }
  viewDate(d: string) {
    return Helper.viewDate(new Date(d));
  }
}
