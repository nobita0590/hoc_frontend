import { Component, OnInit } from '@angular/core';
import { Tests, TestsFilter, SelectSourceFilter, SelectSource } from '../../../app/type';
import { TestsTransport, HelperTransport, SelectSourceTransport } from '../../../app/transport';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Helper } from '../../service';

@Component({
  // tslint:disable-next-line
  selector: 'exam-list',
  templateUrl: './list.component.html',
  providers: [TestsTransport, SelectSourceTransport],
  styles: [`
  .faqs-tab li a.nav-link{
    cursor: pointer;
  }
  .faqs-tab li a.nav-link.active{
    cursor: auto;
  }
  `]
})
export class ListComponent implements OnInit {
  classesSource: SelectSource[] = [];
  subjectSource: SelectSource[] = [];
  testTypeSource: SelectSource[] = [];
  filter = new TestsFilter();
  tests: Tests[] = [];
  constructor(private testsTransport: TestsTransport,
              private selectSourceTransport: SelectSourceTransport,
              private router: Router,
              private title: Title,
              private activatedRoute: ActivatedRoute) {
    this.title.setTitle('Thi online');
    this.filter.Rows = 5;
    this.filter.Page = 1;
    this.filter.Total = 10;
    this.filter.Count = true;
    this.filter.uf = '';
  }
  ngOnInit() {
    const ssFilter = {GroupsId: [1, 2, 7]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[1]) {
          this.classesSource = groups[1];
        }
        if (groups[2]) {
          this.subjectSource = groups[2];
        }
        if (groups[7]) {
          this.testTypeSource = groups[7];
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      let p = parseInt(params['p'] as string, 10);
      if (p && p > 0) {
        this.filter.Page = p;
      }
      this.filter.TypeId = params['t'] ? params['t'] as number : 0;
      this.filter.SubjectId = params['s'] ? params['s'] as number : 0;
      this.filter.ClassId = params['c'] ? params['c'] as number : 0;
      this.filter.uf = params['uf'] ? params['uf'] as string : '';
      this.getData();
    });
    // this.getData();
  }
  exampNumber(t: number): string {
    return Helper.viewNumber(t);
  }
  pageChange(p?: number) {
    if (p) {
      this.filter.Page = p;
    }
    this.changeRoute();
    this.getData();
  }
  refresh() {
    this.changeRoute();
    this.getData();
  }
  changeUserAction(aFilter: string) {
    console.log(aFilter);
    if (this.filter.uf === aFilter) {
      return;
    }
    this.filter.uf = aFilter;
    this.filter.Page = 1;
    this.changeRoute();
    this.getData();
  }
  changeRoute() {
    this.router.navigate(['/thi-online'], {queryParams: {
      p: this.filter.Page,
      uf: this.filter.uf,
      c: this.filter.ClassId,
      s: this.filter.SubjectId,
      t: this.filter.TypeId,
    }});
  }
  getData() {
    this.tests = [];
    this.testsTransport.getList(this.filter)
      .then(_d => {
        this.tests = _d.models;
        let f = JSON.parse(JSON.stringify(this.filter)) as TestsFilter;
        f.Total = _d.p_info.Total;
        this.filter = f;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
