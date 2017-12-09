import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FrondTransport, HelperTransport } from '../../app/transport';
import { News } from '../../app/type';

@Component({
  // tslint:disable-next-line
  selector: 'div[news-component][class="container"]',
  templateUrl: './news.component.html',
  providers: [FrondTransport]
})
export class NewsComponent implements OnInit {
  listNews: News[] = [];
  constructor(private frondTransport: FrondTransport,
              private domSanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.frondTransport.getNewsPage()
      .then( _d => {
        this.listNews = _d.news;
      });
  }
  urlImg(serverPath: string): any {
    if (serverPath) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${HelperTransport.imageUrl(serverPath)})`);
    }
    return this.domSanitizer.bypassSecurityTrustStyle(``);
  }
}
