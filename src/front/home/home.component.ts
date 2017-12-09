import { Component, OnInit } from '@angular/core';
import { FrondTransport } from '../../app/transport';
import { News, Course } from '../../app/type';

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

  constructor(private frondTransport: FrondTransport) { }

  ngOnInit(): void {
    this.frondTransport.getHomePage()
      .then(_d => {
        this.news = _d.news;
        this.courses = _d.courses;
      });
  }

}
