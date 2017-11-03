import { Component, OnInit } from '@angular/core';
import { NewsTransport } from './../../transport/news.transport';
import { News, NewsFilter } from './../../type/news-type';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockTemplateComponent } from './../../shared/block-template.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [NewsTransport]
})
export class ListComponent implements OnInit {

  items: News[] = [];
  itemCount = 0;
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate = BlockTemplateComponent;
  filter: NewsFilter = new NewsFilter();
  categories = NewsFilter.getCategories();
  categoryName(item: News): string {
    for (let category of this.categories) {
      if (item.CategoryId === category.id) {
        return category.name;
      }
    }
    return  '';
  }

  constructor(private newsTranport: NewsTransport) {
    this.filter.Count = true;
  }

  ngOnInit() {
  }

  reloadItems(params) {
    console.log(params);
    this.blockUI.start();
    if (params) {
      this.filter.bindPage(params);
    }
    this.newsTranport.getList(this.filter).then(userInfo => {
      this.blockUI.stop();
      this.items = userInfo.models;
      this.itemCount = userInfo.p_info.Total;
    }).catch(e => {
      this.blockUI.stop();
    });
  }
  delete(id: number) {
    if (!confirm('Bạn có chắc muốn xóa tin khỏi hệ thống?')) {
      return;
    }
    let filter = {ID: id} as NewsFilter;
    this.newsTranport.delete(filter)
      .then(id => {
        this.reloadItems(false);
      })
      .catch( err => {
        console.log(err);
      });
  }

  // special properties:

  rowClick(rowEvent) {
    // console.log('Clicked: ' , rowEvent);
  }

  rowDoubleClick(rowEvent) {
    // alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return `${item.Title}`; }
}
