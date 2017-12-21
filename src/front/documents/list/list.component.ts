import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTransport, HelperTransport, SelectSourceTransport } from '../../../app/transport';
import { Documents, DocumentFilter, SelectSource, SelectSourceFilter } from '../../../app/type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doc-list',
  templateUrl: './list.component.html',
  providers: [
    DocumentTransport, SelectSourceTransport
  ]
})
export class ListComponent implements OnInit {
  classSource: SelectSource[] = [];
  subjectSource: SelectSource[] = [];
  docs: Documents[];
  query = {};
  filter = new DocumentFilter();
  @Output()onPageChange = new EventEmitter<number>();
  constructor(private selectSourceTransport: SelectSourceTransport,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private documentTransport: DocumentTransport) {
    this.filter.IsFill = true;
    this.filter.Rows = 10;
    this.filter.Page = 1;
    this.filter.Total = 10;
    this.filter.Count = true;
  }
  ngOnInit(): void {
    this.selectSourceTransport.getGroup({GroupsId: [1, 2]} as SelectSourceFilter)
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
    this.activatedRoute.queryParams.subscribe( (params) => {
      const p = parseInt(params['p'] as string, 10);
      if (p && p > 0) {
        this.filter.Page = p;
      }
      this.filter.SubjectId = params['s'] ? params['s'] as number : 0;
      this.filter.ClassId = params['c'] ? params['c'] as number : 0;
      this.query = {
        p: this.filter.Page,
        c: this.filter.ClassId,
        s: this.filter.SubjectId,
      };
      this.docs = [];
      this.documentTransport.getList(this.filter)
        .then(_d => {
          this.docs = _d.models;
          const f = JSON.parse(JSON.stringify(this.filter)) as DocumentFilter;
          f.Total = _d.p_info.Total;
          this.filter = f;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  download(doc) {
    // console.log(doc)
    location.href = HelperTransport.API_ENDPOINT + `document/download/${doc.ID}`;
  }
  refresh() {
    setTimeout(() => {
      this.changeRoute();
    }, 10);
  }
  changeRoute() {
    this.router.navigate(['/tai-lieu'], {queryParams: {
      p: this.filter.Page,
      c: this.filter.ClassId,
      s: this.filter.SubjectId,
    }});
    // this.getData();
  }
}
