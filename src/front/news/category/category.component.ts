import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { News, NewsFilter } from '../../../app/type';
import { NewsTransport, HelperTransport } from '../../../app/transport';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  // tslint:disable-next-line
  selector: 'div[news-category][class="col-sm-6 col-md-8"]',
  templateUrl: './category.component.html',
  providers: [NewsTransport]
})
export class CategoryComponent implements OnInit {
  newsFilter = new NewsFilter();
  items: News[] = [];
  hightLightItems: News[] = [];
  title = 'Tin tức';
  constructor(private newsTransport: NewsTransport,
              private titleService: Title,
              private domSanitizer: DomSanitizer,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.newsFilter.Rows = 15;
  }
  ngOnInit() {
    if (this.activatedRoute.snapshot.data) {
      if (this.activatedRoute.snapshot.data.categoryId) {
        this.newsFilter.CategoriesId = [this.activatedRoute.snapshot.data.categoryId];
      }
      if (this.activatedRoute.snapshot.data.title) {
        this.title = this.activatedRoute.snapshot.data.title;
      }
      this.titleService.setTitle(this.title);
    }
    this.newsTransport.getList(this.newsFilter)
      .then(listNews => {
        if (Array.isArray(listNews.models)) {
          if (listNews.models.length > 2) {
            this.hightLightItems = [
              listNews.models[0], listNews.models[1]
            ];
            listNews.models.splice(0, 2);
            this.items = listNews.models;
          } else {
            this.hightLightItems = listNews.models;
          }
        }
      });
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.SERVER_URL + serverPath})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
}
