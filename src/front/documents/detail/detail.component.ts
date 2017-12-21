import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTransport, HelperTransport } from '../../../app/transport';
import { Documents, DocumentFilter } from '../../../app/type';
import { Helper } from '../../service/Helper';

@Component({
  selector: 'app-doc-list',
  templateUrl: './detail.component.html',
  providers: [DocumentTransport]
})
export class DetailComponent implements OnInit {
  user = Helper.getUserInfo();
  doc = new Documents();
  @Output()onPageChange = new EventEmitter<number>();
  constructor(private documentTransport: DocumentTransport,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.documentTransport.getFront({
        ID: params['id'] as number
      } as DocumentFilter)
        .then(_d => {
          this.doc = _d;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  download() {
    if (this.user) {
      location.href = HelperTransport.API_ENDPOINT + `document/download/${this.doc.ID}`;
    }
  }
}
