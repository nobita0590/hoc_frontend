import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperTransport } from '../../../app/transport';
import { News } from '../../../app/type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'div[newsItem]',
  template: `
    <div class="wrap-article">
      <a [routerLink]="['/tin-tuc/', category, _item.PrettyUrl, _item.ID]" class="img-thumb-art img-cover"
         [style.background-image]="urlImg(_item.ImageUrl)"></a>
      <h3>
        <a [routerLink]="['/tin-tuc/', category, _item.PrettyUrl, _item.ID]">{{_item.Title}}</a>
      </h3>
    </div>
  `,
  providers: []
})
export class NewsItemComponent implements OnInit {
  _item: News;
  category = 'chi-tiet';
  get news(): News{
    return this._item;
  }
  @Input()
  set news(item: News) {
    this._item = item;
  }
  @Output()onPageChange = new EventEmitter<number>();
  constructor(private domSanitizer: DomSanitizer,
              private router: Router) {
  }
  ngOnInit(): void {
    switch (this._item.CategoryId) {
      case 1:
        this.category = 'thong-tin-tuyen-sinh';
        break;
      case 2:
        this.category = 'bi-quyet-hoc-thi';
        break;
      default:
        this.category = 'chi-tiet';
    }
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.imageUrl(serverPath)})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
}
