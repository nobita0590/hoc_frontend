import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Course, CourseFilter } from '../../../app/type';
import { CourseTransport, HelperTransport } from '../../../app/transport';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line
  selector: 'course-category',
  templateUrl: './course-category.component.html',
  providers: [CourseTransport]
})
export class CategoryComponent implements OnInit {
  filter = new CourseFilter();
  items: Course[] = [];
  title = 'Khóa học';
  total = 0;
  constructor(private courseTransport: CourseTransport,
              private titleService: Title,
              private domSanitizer: DomSanitizer,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.filter.Rows = 20;
    this.filter.Page = 1;
    this.filter.Total = 400;
    this.filter.Count = true;
    this.titleService.setTitle(this.title);
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      let p = parseInt(params['p'] as string, 10);
      if (p && p > 0) {
        this.filter.Page = p;
      }
      this.getData();
    });
  }
  getData() {
    this.courseTransport.getList(this.filter)
      .then(listNews => {
        this.items = listNews.models;
        let f = JSON.parse(JSON.stringify(this.filter)) as CourseFilter;
        f.Total = listNews.p_info.Total;
        this.filter = f;
      });
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.imageUrl(serverPath)})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
  pageChange(p: number) {
    this.router.navigate(['/khoa-hoc'], {queryParams: {p: p}});
    this.filter.Page = p;
    this.getData();
  }
}
