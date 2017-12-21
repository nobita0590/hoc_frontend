import { Component, OnInit } from '@angular/core';
import { Fags,  FagsFilter, SelectSource, SelectSourceFilter } from '../../../app/type';
import { SelectSourceTransport, FagsTransport } from '../../../app/transport';
import { Helper } from '../../service/Helper';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-fags-main',
  templateUrl: './fags.component.html',
  providers: [SelectSourceTransport, FagsTransport],
  styles: [`
    .block-wegit li a.active {background: #00cc52;}
    .list-class li a.active { background: #b6dd80;}
  `]
})
export class FagsComponent implements OnInit {
  classSource: SelectSource[] = [];
  subjectSource: SelectSource[] = [];
  filter = new FagsFilter();
  query = {};
  listFags: Fags[] = [];
  constructor(private selectSourceTransport: SelectSourceTransport,
              private fagsTransport: FagsTransport,
              private router: Router,
              private title: Title,
              private activatedRoute: ActivatedRoute) {
    this.filter.Count = true;
    this.filter.Rows = 10;
    this.filter.Page = 1;
    this.filter.Total = 10;
    this.filter.Count = true;
    this.title.setTitle('Hỏi đáp');
  }

  ngOnInit(): void {
    const ssFilter = {GroupsId: [1, 2]} as SelectSourceFilter;
    this.selectSourceTransport.getGroup(ssFilter)
      .then(groups => {
        if (groups[1]) {
          this.classSource = groups[1];
        }
        if (groups[2]) {
          this.subjectSource = groups[2];
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
      this.filter.SubjectId = params['s'] ? params['s'] as number : 0;
      this.filter.ClassId = params['c'] ? params['c'] as number : 0;
      this.filter.Option = params['o'] ? params['o'] as string : '';
      this.query = {
        p: this.filter.Page,
        c: this.filter.ClassId,
        s: this.filter.SubjectId,
        o: this.filter.Option,
      };
      this.getData();
    });
  }
  getData() {
    this.listFags = [];
    this.fagsTransport.getList(this.filter)
      .then(_d => {
        this.listFags = _d.models;
        const f = JSON.parse(JSON.stringify(this.filter)) as FagsFilter;
        f.Total = _d.p_info.Total;
        this.filter = f;
      })
      .catch(err => {
        console.log(err);
      });
  }
  changeClass(_class: SelectSource) {
    if (this.filter.ClassId == _class.ID) {
      this.filter.ClassId = 0;
    } else {
      this.filter.ClassId = _class.ID;
    }
    this.filter.Page = 1;
    this.changeRoute();
  }
  changeSubject(_sj: SelectSource) {
    if (this.filter.SubjectId == _sj.ID) {
      this.filter.SubjectId = 0;
    } else {
      this.filter.SubjectId = _sj.ID;
    }
    this.filter.Page = 1;
    this.changeRoute();
  }
  changeCategory(cate) {
    if (this.filter.Option == cate) {
      return;
    }
    this.filter.Option = cate;
    this.filter.Page = 1;
    this.changeRoute();
  }
  changeRoute() {
    this.query = {
      p: this.filter.Page,
      c: this.filter.ClassId,
      s: this.filter.SubjectId,
      o: this.filter.Option,
    }
    this.router.navigate(['/hoi-dap'], {queryParams: this.query});
  }
  pageChange($e) {
    console.log($e);
  }
}
