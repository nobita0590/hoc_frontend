import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { News, NewsFilter } from '../../../app/type';
import { NewsTransport, HelperTransport } from '../../../app/transport';
import { Helper } from '../../service';
import { Title } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line
  selector: 'div[news-detail][class="col-sm-6 col-md-8"]',
  templateUrl: './detail.component.html',
  providers: [NewsTransport]
})
export class DetailComponent implements OnInit {
  news: News = new News();
  relate: News[] = [];
  constructor(private newsTransport: NewsTransport,
              private route: Router,
              private title: Title,
              private activeRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if (!id) {
        this.route.navigate(['trang-chu']);
        return;
      }
      this.newsTransport.detailNews({
        ID: id,
        Rows: 8,
      } as NewsFilter)
        .then(_d => {
          this.news = _d.news;
          this.relate = _d.relate;
          this.title.setTitle(this.news.Title);
        })
        .catch(err => {
          this.route.navigate(['trang-chu']);
        });
    });
  }
  viewDate(raw): string {
    return Helper.viewDate(new Date(raw));
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.SERVER_URL + serverPath})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
}
