import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { News, NewsFilter } from '../../../app/type';
import { NewsTransport, HelperTransport } from '../../../app/transport';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  total = 0;
  constructor(private newsTransport: NewsTransport,
              private titleService: Title,
              private domSanitizer: DomSanitizer,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.newsFilter.Rows = 17;
    this.newsFilter.Page = 1;
    this.newsFilter.Total = 400;
    this.newsFilter.Count = true;
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
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      let p = parseInt(params['p'] as string, 10);
      if (p && p > 0) {
        this.newsFilter.Page = p;
      }
      this.getData();
    });
  }
  getData() {
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
        let f = JSON.parse(JSON.stringify(this.newsFilter)) as NewsFilter;
        f.Total = listNews.p_info.Total;
        this.newsFilter = f;
      });
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.imageUrl(serverPath)})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
  pageChange(p: number) {
    // this.router.navigate(['/tin-tuc/bi-quyet-hoc-thi'], {queryParams: {p: p}});
    this.newsFilter.Page = p;
    this.getData();
  }
}
