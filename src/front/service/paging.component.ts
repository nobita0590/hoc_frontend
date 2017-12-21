import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../app/type';

@Component({
  selector: 'nav[paging][aria-label="navigation"]',
  template: `
    <ul class="pagination">
      <li *ngIf="1 != _page.Page" class="page-item">
        <a class="page-link" (click)="pageChange(1)" aria-label="Previous"
           [routerLink]="[link]" [queryParams]="getQuery(1)">
          <span class="fa fa-angle-double-left" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" *ngFor="let p of _previous">
        <a class="page-link action" (click)="pageChange(p)"
           [routerLink]="[link]" [queryParams]="getQuery(p)">{{p}}</a>
      </li>
      <li class="page-item active"><a class="page-link" >{{_page.Page}}</a></li>
      <li class="page-item" *ngFor="let p of _next">
        <a class="page-link action" (click)="pageChange(p)"
           [routerLink]="[link]" [queryParams]="getQuery(p)">{{p}}</a>
      </li>
      <li *ngIf="total != _page.Page" class="page-item">
        <a class="page-link" (click)="pageChange(total)"
           [routerLink]="[link]" [queryParams]="getQuery(total)" aria-label="Next">
          <span class="fa fa-angle-double-right" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  `,
  providers: []
})
export class PagingComponent implements OnInit {
  _page: Page;
  total = 0;
  _previous = [];
  _next = [];
  link: string;
  @Input() max: number;
  @Input() query: any;
  get page(): Page{
    return this._page;
  }
  @Input()
  set page(p: Page) {
    this._page = p;
    this._bind();
  }
  /*get totalRows(): number {
    return this._page.Total;
  }
  @Input()
  set totalRows(t: number) {
    this._page.Total = t;
    this._bind();
  }*/
  @Output()onPageChange = new EventEmitter<number>();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    let currentRoute = this.activatedRoute.root;
    this.link = '';
    do {
      const childrenRoutes = currentRoute.children;
      currentRoute = null;
      childrenRoutes.forEach( route => {
        if (route.outlet === 'primary') {
          const routeSnapshot = route.snapshot;
          this.link += '/' + routeSnapshot.url.map(segment => segment.path).join('');
          currentRoute = route;
        }
      });
    } while (currentRoute);
  }

  ngOnInit(): void {
    if (typeof(this.query) !== 'object') {
      this.query = {};
    }
  }
  pageChange(p: number) {
    if (p != this._page.Page) {
      // this.router.navigate([this.link], {queryParams: this.getQuery(p)});
      // this.onPageChange.emit(p);
    }
  }
  private _bind() {
    this._previous = [];
    this._next = [];
    if (!this._page.Total || this._page.Total < 1 || !this._page.Rows || this._page.Rows < 1) {
      this.total = 1;
    } else {
      this.total = Math.ceil(this._page.Total / this._page.Rows);
    }
    if (!this._page.Page || this._page.Page > this.total) {
      // this._page.Page = this.total;
      return;
    }
    let i = this._page.Page - 1, j = 1, max = 1;
    if (this.max && this.max > max) {
      max = this.max;
    }
    while (j < max && i > 1) {
      this._previous.push(i);
      i--; j++;
    }
    this._previous.reverse();
    i = this._page.Page + 1;
    j = 1;
    while (i < this.total && j < max) {
      this._next.push(i);
      j++; i++;
    }
  }
  getQuery(p: number) {
    this.query.p = p;
    return JSON.parse(JSON.stringify(this.query));
  }
}
