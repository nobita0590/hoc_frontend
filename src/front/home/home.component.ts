import { Component, OnInit } from '@angular/core';
import { FrondTransport } from '../../app/transport';
import { News, Course, Documents, Fags, SelectSource } from '../../app/type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .courses-item {
    float: left;
  }
  `],
  providers: [FrondTransport]
})
export class HomeComponent implements OnInit {
  news: News[];
  courses: Course[];
  docs: Documents[];
  newFags: Fags[];
  hotFags: Fags[];
  subjects: SelectSource[];

  constructor(private frondTransport: FrondTransport,
              private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.frondTransport.getHomePage()
      .then(_d => {
        this.news = _d.news;
        this.courses = _d.courses;
        this.docs = _d.docs;
        this.newFags = _d.newFags;
        this.hotFags = _d.hotFags;
        this.subjects = _d.subjects;
      });
  }
  subjectBackground(index: number) {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(public/frondtend/images/mon-hoc-${index + 1}.jpg)`);
  }
}
