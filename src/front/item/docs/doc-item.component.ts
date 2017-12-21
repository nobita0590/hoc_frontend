import { Component, OnInit, Input } from '@angular/core';
import { HelperTransport } from '../../../app/transport';
import { Documents } from '../../../app/type';

@Component({
  selector: 'li[docItem]',
  template: `
    <div class="row">
      <div class="col-auto"><img src="/public/frondtend/img/pdf.png"></div>
      <div class="col px-0">
        <h3><a  [routerLink]="['/tai-lieu',doc.PrettyUrl,doc.ID]">{{doc.Name}}</a></h3>
        <p class="mb-0">
          <a class="text-success">- {{doc.SubjectName}}</a>
          <a class="ml-3 text-primary">{{doc.ClassName}}</a>
        </p>
      </div>
      <div class="col-sm-auto text-center">
        <a (click)="download(doc)" class="btn btn-sm btn-success btn-block">Tải xuống</a>
        <small class="text-secondary">{{doc.DownloadNumber}} lượt tải</small>
      </div>
    </div>
    <hr>
  `,
  providers: []
})
export class DocItemComponent implements OnInit {
  doc: Documents;
  category = 'chi-tiet';
  get docx(): Documents{
    return this.doc;
  }
  @Input()
  set docx(item: Documents) {
    this.doc = item;
  }
  ngOnInit(): void {
  }
  download(doc) {
    // console.log(doc)
    location.href = HelperTransport.API_ENDPOINT + `document/download/${doc.ID}`;
  }
}
