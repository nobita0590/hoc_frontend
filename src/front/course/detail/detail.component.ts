import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Course, CourseFilter } from '../../../app/type';
import { CourseTransport, HelperTransport } from '../../../app/transport';
import { Helper, ChannelService } from '../../service';
import { Title } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line
  selector: 'course-detail',
  templateUrl: './detail.component.html',
  providers: [CourseTransport],
  styles: [`
  .section-courses-detail .frame-view{
    background-image: url(images/thumb-1.png)
  }
  `]
})
export class DetailComponent implements OnInit {
  submitting = false;
  course: Course = new Course();
  relate: Course[] = [];
  hasYoutube = false;
  youtubeUrl: SafeHtml;
  constructor(private courseTransport: CourseTransport,
              private route: Router,
              private title: Title,
              private activeRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private channelService: ChannelService) {
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      let id = params['id'];
      if (!id) {
        this.route.navigate(['trang-chu']);
        return;
      }
      this.courseTransport.detailCourse({
        ID: id,
        Rows: 6,
      } as CourseFilter)
        .then(_d => {
          this.course = _d.course;
          if (this.course.YoutubeUrl) {
            this.youtubeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.course.YoutubeUrl}`);
            this.hasYoutube = true;
            console.log(this.youtubeUrl);
          }
          this.relate = _d.relate;
          this.title.setTitle(this.course.Title);
        })
        .catch(err => {
          this.route.navigate(['khoa-hoc']);
        });
    });
  }
  viewDate(raw): string {
    return Helper.viewDate(new Date(raw));
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.imageUrl(serverPath)})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
  registerCourse() {
    if (this.course.Resitered || this.submitting) {
      return;
    }
    const user = Helper.getUserInfo();
    if (user) {
      this.submitting = true;
      this.courseTransport.regis(this.course.ID)
        .then( _d => {
          this.course.Resitered = true;
          this.submitting = false;
        })
        .catch(err => {
          this.submitting = false;
        });
    } else {
      this.channelService.loginCalling(true);
    }
  }
}
