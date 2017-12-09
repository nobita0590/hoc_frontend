import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperTransport } from '../../../app/transport';
import { Course } from '../../../app/type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'div[courseItem]',
  template: `
    <div>
      <a class="courses-img"
         [routerLink]="['/khoa-hoc/' + _course.PrettyUrl+ '/' + _course.ID]"
         [style.background-image]="urlImg(_course.ImageUrl)"></a>
      <p class="courses-author"><a>{{_course.TeacherName}}</a></p>
      <h3 class="courses-name">
        <a [routerLink]="['/khoa-hoc/' + _course.PrettyUrl+ '/' + _course.ID]">{{_course.Title}}</a>
      </h3>
      <div class="courses-rate text-success px-3">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star-half-o"></i>
        <i class="fa fa-star-o"></i>
        <small class="text-secondary">(0)</small>
      </div>
      <div class="courses-price text-right px-3">
        <label class="badge badge-1b75ba">{{_course.Price}} đ</label>
      </div>
    </div>
  `,
  providers: []
})
export class CourseItemComponent implements OnInit {
  _course: Course;
  get course(): Course{
    return this._course;
  }
  @Input()
  set course(course: Course) {
    this._course = course;
  }
  @Output()onPageChange = new EventEmitter<number>();
  constructor(private domSanitizer: DomSanitizer,
              private router: Router) {
  }
  ngOnInit(): void {
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.imageUrl(serverPath)})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
}
